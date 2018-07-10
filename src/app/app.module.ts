import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonCoreModule } from './common-core/common-core.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './common-core/app.routing';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmissionComponent } from './submission/submission.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChallengesComponent,
    ChallengeComponent,
    SubmissionComponent,
  ],
  imports: [
    BrowserModule,
    CommonCoreModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
