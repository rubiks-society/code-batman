import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../common-core/firestore.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  public challenges;

  constructor(public db: FirestoreService, private route: ActivatedRoute, private router: Router) {
    this.challenges = db.getPracticeChallenges();
  }

  ngOnInit() {
    const isPartOfCompetition = this.route.snapshot.data['hasId'];
    console.log("<challenges-component> IsPartOfComp: ",isPartOfCompetition);
    if(isPartOfCompetition) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.challenges = this.db.getCompetitionsChallanges(params.get('id'));
      })
    }
    else {
      this.challenges = this.db.getActiveChallenges();
    }
  }

}
