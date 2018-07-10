import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../common-core/firestore.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  public challenges;

  constructor(public db: FirestoreService) {
    this.challenges = db.getActiveChallenges();
  }

  ngOnInit() {
  }

}
