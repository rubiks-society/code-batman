import { Component } from '@angular/core';
import { AuthService } from './common-core/auth.service';
import { faCoffee, faHome, faBlender, faInfo, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinux, faSith, faStickerMule } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  faHome = faHome;
  faChallanges = faBlender;
  faInfo = faInfo;
  faLogin = faSignInAlt;
  faPractice = faStickerMule;
  faCompetition = faSith;
  faLogout = faSignOutAlt;
  constructor(public auth: AuthService) {}
}
