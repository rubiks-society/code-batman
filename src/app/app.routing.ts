import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { environment } from '../environments/environment';
import { SubmissionComponent } from './submission/submission.component';
import { PracticeComponent } from './practice/practice.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionComponent } from './competition/competition.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'challenges/:id',
    component: ChallengesComponent,
    data: {hasId: true}
  },
  {
    path: 'challenges',
    component: ChallengesComponent,
    data: {hasId: false}
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
  },
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: 'competition/:id',
    component: CompetitionComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{enableTracing: !environment.production, onSameUrlNavigation: 'reload' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
