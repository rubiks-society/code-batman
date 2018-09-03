import * as firebase from 'firebase/app';

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
};

// challenges/
export interface Challenge {
    id: string;
    title: string;
    isPartOfCompetition?: boolean;
    competitionId?: string; //Root location of competition; if any
    competitionName?: string; //Name of competition; if any
    isPractice?: boolean;
    statement: string;
    createdBy: string;
    testCase: string;
    testSolution: string;
    testExplanation: string;
    timestamp: string;
}

// challenges/{}/board/{uid}/submissions/
export interface Submission {
    id?: string;
    createdBy: string; //uid
    createdByName: string;
    code: string;
    language: string;
    status: string; //completed, submitted, processing
    challengeId: string;
    result?: boolean;
}

// challenges/{}/board/{uid}/submissions/{}/result/
export interface SubmissionResult {
    caseId: number;
    pass: boolean;
    result: string;
}

// competitions/
export interface Competition {
    id: string;
    title: string;
    competitionType: string; // "full-timed" when individual start time does not matter, "individual-timed" when it does
    startUnixTime: number;
    endUnixTime: number;
    individualDuration?: number;
    challanges?: string[];
}


// CLASSES
export class CompetitionClass implements Competition {
    id: string;
    title: string;
    competitionType: string;
    startUnixTime: number;
    endUnixTime: number;
    individualDuration?: number;
    challanges?: string[];
    startTime: Date;
    endTime: Date;
    
    constructor(competition: Competition) {
        this.id = competition.id;
        this.title = competition.title;
        this.competitionType = competition.competitionType;
        this.startUnixTime = competition.startUnixTime;
        this.startTime = new Date(1000*competition.startUnixTime);
        this.endUnixTime = competition.endUnixTime;
        this.endTime = new Date(1000*competition.endUnixTime);
        this.individualDuration = competition.individualDuration;
        this.challanges = competition.challanges;
    }

    public timeRemainingString():string {
        console.log("Called");
        const now = new Date(firebase.firestore.Timestamp.now().seconds*1000)
        const p = this.endTime.valueOf() - now.valueOf();
        const convertTo = function(p: number) {
            const days = Math.floor(p/(60*60*24));
            const hours = Math.floor(p/(60*60) - days*24);
            const minutes = Math.floor(p/60 - hours*60 - days*24*60);
            let result = "";
            result += days ? days + " days " : "";
            result += hours ? hours + " hours " : "";
            result += minutes ? minutes + " minutes" : "";
            return result;
        }
        return convertTo(p/1000);
    }
}

export const random_id = function(len: number = 9) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
}