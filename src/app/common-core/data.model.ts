export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
};

export interface Challenge {
    id: string;
    title: string;
    isPartOfContest?: boolean;
    contestId?: string; //Root location of contest; if any
    contestName?: string; //Name of contest; if any
    isPractice?: boolean;
    statement: string;
    createdBy: string;
    testCase: string;
    testSolution: string;
    testExplanation: string;
    timestamp: string;
}

// challenges/{}/board/{uid}/submissions
export interface Submission {
    id?: string;
    createdBy: string; //uid
    createdByName: string;
    code: string;
    language: string;
    status: string; //completed, submitted, processing
    challengeId: string;
    result ?: boolean;
}

// challenges/{}/board/{uid}/submissions/{}/result
export interface SubmissionResult {
    caseId: number;
    pass: boolean;
    result: string;
}

export const random_id = function(len: number = 9) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
}