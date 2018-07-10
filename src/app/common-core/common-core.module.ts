import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [
    NgbModule
  ],
  declarations: [],
  providers: [FirestoreService,AuthService]
})
export class CommonCoreModule { }
