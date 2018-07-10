import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { hackerearthApi } from './keys';

var rp = require('request-promise');
admin.initializeApp(functions.config().firebase);


const db = admin.firestore();
const runEndPoint = "https://api.hackerearth.com/code/run/"; 
const compileEndPoint = "https://api.hackerearth.com/code/compile/";

export const newUser = functions.auth.user().onCreate((user) => {
    return db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid
    });
});

export const newSubmission = functions.firestore.document('challenges/{challenge}/submissions/{submission}').onCreate((snapshot,context) => {
    const data = snapshot.data();
    if(data.status !== "submitted") {
        return null;
    }
    else{
        let runResponse: boolean = true; 
        const denyResponse = function(){
            return  db.doc(`challenges/${context.params.challenge}/submissions/${context.params.submission}`).update({'result':false});
        }
        return db.doc(`challenges/${context.params.challenge}/submissions/${context.params.submission}`).update({'status':'processing','id':context.params.submission,'result':true}).then(()=>
             db.collection(`challenges/${context.params.challenge}/hiddenCases`).where('visible','==',true).get().then((snaps) => {
             snaps.forEach(snap => {
                const testData = snap.data();
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
                return rp(options).then((body) => {
                    if(body.message !== "OK") {
                        // An error occured
                        console.log(body+"1");
                        return null;
                    }
                    else{
                        if(body.compile_status !== "OK") {
                            runResponse = false;
                            console.log(body+"2");
                            return db.collection(`challenges/${context.params.challenge}/submissions/${context.params.submission}/results`).add({
                                'caseId': testData.caseId,
                                'pass': false,
                                'result': 'compile_time_error'
                            }).then(()=>denyResponse());
                        }
                        else {
                            if(body.run_status.status === "AC"){
                                //correct run 
                                console.log(body+"3");
                                if(body.run_status.output === testData.result){
                                    return db.collection(`challenges/${context.params.challenge}/submissions/${context.params.submission}/results`).add({
                                        'caseId': testData.caseId,
                                        'pass': true,
                                        'result': 'correct'
                                    });
                                }
                                else{
                                    runResponse = false;
                                    console.log(body+"4");
                                    return db.collection(`challenges/${context.params.challenge}/submissions/${context.params.submission}/results`).add({
                                        'caseId': testData.caseId,
                                        'pass': false,
                                        'result': 'incorrect'
                                    }).then(()=>denyResponse());
                                }
                            }
                            else{
                                console.log(body+"5");
                                runResponse = false;
                                runResponse = false;
                                return db.collection(`challenges/${context.params.challenge}/submissions/${context.params.submission}/results`).add({
                                    'caseId': testData.caseId,
                                    'pass': false,
                                    'result': body.run_status.status
                                }).then(()=>denyResponse());
                            }
                        }
                    }
                }).catch((err) => {
                    console.error(err);
                    return null;
                })
            });
        })
    ).then(()=> db.doc(`challenges/${context.params.challenge}/submissions/${context.params.submission}`).update({'status':'completed','result':runResponse}));
    }
})