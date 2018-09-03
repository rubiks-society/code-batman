import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../common-core/firestore.service';
import { CompetitionClass } from '../common-core/data.model';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  public competitions: CompetitionClass[];

  constructor(public db: FirestoreService) {
    this.competitions = [];
    db.getCompetitions().subscribe(comp => {
      comp.forEach(element => {
        this.competitions.push(new CompetitionClass(element))
      });
    });
  }

  remainingString(comp: CompetitionClass) {
    console.log("Fe");
    return comp.timeRemainingString();
  }

  ngOnInit() {
  }

}