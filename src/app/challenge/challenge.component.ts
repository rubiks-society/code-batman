import { Component, OnInit } from '@angular/core';
import { Challenge, Submission, SubmissionResult } from '../common-core/data.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from '../common-core/firestore.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../common-core/auth.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};
    
  onChange(code) {
    console.log("new code", code);
  }

  // check from here https://www.hackerearth.com/docs/wiki/developers/v3/
  public supportedLanguages = ["C","CPP","CPP11","CLOJURE","CSHARP","JAVA","JAVASCRIPT","HASKELL","PERL","PHP","PYTHON","RUBY"]; //Also change in html when changing this #notAutomatic

  challengeForm = new FormGroup({
    code: new FormControl(),
    language: new FormControl()
  });
  public runButtonState: boolean = false;
  private challenge$: Observable<Challenge>;
  public challenge: Challenge;
  public latestSubmission: Submission;
  public latestSubmissionResults: SubmissionResult[];

  constructor(private route: ActivatedRoute,private router: Router, private db: FirestoreService, public auth: AuthService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.db.getChallenge(params.get('id')))
    ).subscribe((challenge) => {
      this.challenge = challenge;
    })
  }

  run(type: string) {
    if(type == "final-run") {
      if(this.supportedLanguages.indexOf(this.challengeForm.value.language) > -1 )
      {
        this.runButtonState = true;
        this.db.addSubmission(this.challenge.id,this.challengeForm.value.language,this.challengeForm.value.code).then(ref => {
          console.log(`New submission with id ${ref.id}`);
          this.runButtonState = false;
          return this.db.getSubmission(this.challenge.contestId,ref.id,this.auth.id).subscribe((submission) => {
            this.latestSubmission = submission;
            return this.db.getSubmissionResults(this.challenge.id,ref.id,this.auth.id).subscribe((submissionResults) => {
              this.latestSubmissionResults = submissionResults;
            })
          });
          
          // this.router.navigate(["/submission",this.challenge.id,ref.id]);
        });
      }
      else {
        alert("Select a language");
      }
      
    }
  }

}
