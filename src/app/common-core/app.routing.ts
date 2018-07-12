import { NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ChallengesComponent } from '../challenges/challenges.component';
import { ChallengeComponent } from '../challenge/challenge.component';
import { environment } from '../../environments/environment';
import { SubmissionComponent } from '../submission/submission.component';
import { PracticeComponent } from '../practice/practice.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'challenges',
    component: ChallengesComponent
  },
  {
    path: 'practice',
    component: PracticeComponent
  },
  {
    path: 'submission/:cid/:id',
    component: SubmissionComponent
  },
  {
    path: 'challenge/:id',
    component: ChallengeComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{enableTracing: !environment.production}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
