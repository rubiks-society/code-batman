import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../common-core/firestore.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  public challenges;

  constructor(public db: FirestoreService) {
    this.challenges = db.getPracticeChallenges();
  }

  ngOnInit() {
  }

}
