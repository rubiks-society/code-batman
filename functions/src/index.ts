import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { hackerearthApi } from './keys';

let rp = require('request-promise');
admin.initializeApp(functions.config().firebase);

/**
 * Console Logging Legends:
 * [*] at the beginning - logs that are only in dev use, remove in production
 * <{functionName}-{uniqueShortCode}> - short code should have some meaning
 */

const db = admin.firestore();
const runEndPoint = "https://api.hackerearth.com/code/run/"; 
const compileEndPoint = "https://api.hackerearth.com/code/compile/";

export const newUser = functions.auth.user().onCreate((user) => {
    return db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid,
        points: 0,
    });
});

export const newSubmission = functions.firestore.document('challenges/{challenge}/board/{uid}/submissions/{submission}').onCreate((snapshot,context) => {
    const data = snapshot.data();
    if(data.status !== "submitted") {
        // Already under processing
        return null;
    }
    else {
        console.log("[*]<newSubmission-RNS> Code: ",data.code);
        const challengePath = `challenges/${context.params.challenge}`;
        const boardPath = `${challengePath}/board/${context.params.uid}`;
        const submissionPath = `${boardPath}/submissions/${context.params.submission}`;

        // First check if user has earlier submitted in this challenge or not, 
        // Coz, if not, the parent document, challenges/{challenge}/board/{uid}, DOES NOT EXIST
        return db.doc(boardPath).get()
            .then((userRecordSnapshot) => {
                console.log("[*]<newSubmission-PS1>Promise Slot 1");
                if(userRecordSnapshot.exists) {
                    //User has already submitted and his/her document exists
                    return null;
                }
                else {
                    return db.doc(boardPath).set({
                        // because the submission that was just made (which triggered this) has all the required data
                        createdByName: data.createdByName,
                        createdBy: data.createdBy,
                        challengeId: data.challengeId,
                        score: 0,
                        result: false
                    });
                }
            })
            .then(() => {
                console.log("[*]<newSubmission-PS2>Promise Slot 2");
                // Set the status of submission to processing
                return db.doc(submissionPath).update({
                    'status': 'processing',
                    'id': context.params.submission,
                    'result': true
                })
            })
            .then(() => {
                console.log("[*]<newSubmission-PS3>Promise Slot 3");
                // Get the list of all hiddenCases
                return db.collection(`${challengePath}/hiddenCases`).where('visible','==',true).get();
            })
            .then((snapshots) => {
                console.log("[*]<newSubmission-PS4>Promise Slot 4");
                let totalCases = snapshots.size;
                const individualScore = 100/totalCases;
                let score = 0;
                let eachCall = snapshots.docs.map((testDataSnap) => {
                    const testData = testDataSnap.data();
                    console.log("[*]<newSubmission-MAP>Started Execution ",testData.caseId);
                    const options = {
                        method: 'POST',
                        uri: runEndPoint,
                        gzip: true,
                        form: {
                            'client_secret': hackerearthApi.clientSecret,
                            'async': 0,
                            'source': data.code,
                            'lang': data.language,
                            'input': testData.input ? testData.input : '',
                            'time_limit': testData.time_limit ? testData.time_limit : 5, // TODO: Relative time limit
                            'memory_limit': testData.memory_limit ? testData.memory_limit : 131072 // max: 262144 (kibibit or 256 mibibit)
                        },
                        json: true
                    };
                    return new Promise(async (resolveX) => {
                        console.log("[*]<newSubmission-RX1>Making request to API");
                        let body;
                        try {
                            body = await rp(options);
                        }
                        catch(err) {
                            console.error("<newSubmission-RE>Request to API failed. ",err);
                            return;
                        }
                        console.log("[*]<newSubmission-RX2>Request Completed with result body: ",body);
                        let promiseResult = false;
                        if(body.message !== "OK") {
                            console.error("API CALL ERROR! ",body);
                        }
                        else {
                            if(body.compile_status !== "OK") {
                                // Compile time error
                                console.log("[*]<newSubmission-RXP1> Compile time error, check result body.");
                            }
                            if(body.run_status.status === "AC"){
                                // RUN was successful
                                if(body.run_status.output === testData.result){
                                    console.log("[*]<newSubmission-RXP2> Correct Submission.");
                                    promiseResult = true;
                                    await db.collection(`${submissionPath}/results`).add({
                                        'caseId': testData.caseId,
                                        'pass': true,
                                        'result': 'correct'
                                    });
                                }
                                else{
                                    console.log("[*]<newSubmission-RXP3> Incorrect Submission.");
                                    await db.collection(`${submissionPath}/results`).add({
                                        'caseId': testData.caseId,
                                        'pass': false,
                                        'result': 'incorrect'
                                    });
                                }
                            }
                            else{
                                console.log("[*]<newSubmission-RXP4> Some other error.");
                                await db.collection(`${submissionPath}/results`).add({
                                    'caseId': testData.caseId,
                                    'pass': false,
                                    'result': body.run_status.status
                                });
                            }
                        }
                        resolveX(promiseResult);
                    });
                });
                return Promise.all(eachCall);
            })
            .then((values) => {
                console.log("[*]<newSubmission-PS5> Promise Slot 5")
                // example: [true,true,true]
                let finalresult = true;
                for (let i = 0; i < values.length; i++) {
                    if(values[i] === false){
                        finalresult = false;
                        break;
                    }                    
                }
                console.log("[*]<newSubmission-FR> Final  Result 5",finalresult);
                return finalresult;
            })
            .then((result) => {
                console.log("[*]<newSubmission-PS5> Promise Slot 6")
                if(result) 
                    return db.doc(submissionPath).update({
                        'result': true,
                        'status': 'completed'
                    })
                    .then(() => db.doc(boardPath).update({'result': true}));
                else 
                    return db.doc(submissionPath).update({
                        'result': false,
                        'status': 'completed'
                    })
            })
            .catch((err) => {
                console.log("<newSubmission-ERR> ",err)
            })
    }
});
