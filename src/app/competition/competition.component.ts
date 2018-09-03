import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from '../common-core/firestore.service';
import { Competition, CompetitionClass } from '../common-core/data.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  public competition: CompetitionClass;

  constructor(private route: ActivatedRoute, private db: FirestoreService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.db.getCompetition(params.get('id')))
    ).subscribe((comp) => {
      this.competition = new CompetitionClass(comp);
    })
  }
}
