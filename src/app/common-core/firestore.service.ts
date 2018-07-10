import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User, Challenge, Submission, random_id } from './data.model';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usersPath: string;
  private challengesPath: string;

  constructor(private afs: AngularFirestore,private auth: AuthService) {
    this.usersPath = 'users';
    this.challengesPath = 'challenges';
  }
  
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getUser(uid: string) {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }
  
  getActiveChallenges() {
    return this.afs.collection<Challenge>(`${this.challengesPath}`,ref => ref.where('isPartOfContest','==',false).orderBy('timestamp','desc')).valueChanges();
  }

  getChallenge(id: string) {
    return this.afs.doc<Challenge>(`${this.challengesPath}/${id}`).valueChanges();
  }

  getSubmission(cid:string,id: string) {
    return this.afs.doc<Submission>(`${this.challengesPath}/${cid}/submissions/${id}`).valueChanges();
  }

  getSubmissionResults(cid: string, id:string) {
    return this.afs.collection<Submission>(`${this.challengesPath}/${cid}/submissions/${id}/results`).valueChanges();
  }

  addSubmission(challengeId:string, language: string, code: string) {
    const submission = {
      createdBy: this.auth.user.uid,
      createdByName: this.auth.user.displayName,
      code: code,
      language: language,
      status: "submitted",
      challengeId: challengeId
    }
    return this.afs.collection<Submission>(`${this.challengesPath}/${challengeId}/submissions`).add(submission);
  }
}
