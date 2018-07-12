import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonCoreModule } from './common-core/common-core.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './common-core/app.routing';
import { ChallengesComponent } from './challenges/challenges.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmissionComponent } from './submission/submission.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmarteditorComponent } from './smarteditor/smarteditor.component';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChallengesComponent,
    ChallengeComponent,
    SubmissionComponent,
    SmarteditorComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonCoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AceEditorModule,
    FormsModule,
    MatSelectModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
