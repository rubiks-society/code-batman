import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from '../common-core/firestore.service';
import { Submission } from '../common-core/data.model';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  public submission: Submission;
  public caseRuns: Submission[];
  private challengeId: string;
  private submissionId: string;

  constructor(private route: ActivatedRoute, private db: FirestoreService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.challengeId = params.get('cid');
        this.submissionId = params.get('id');
        return this.db.getSubmission(params.get('cid'),params.get('id'))
      })
    ).subscribe((submission) => {
      console.log(submission);
      this.submission = submission;
      this.db.getSubmissionResults(this.challengeId,this.submissionId).subscribe((caseRuns) => {
        this.caseRuns = caseRuns;
      });
    })
  }

}
