import { Component } from '@angular/core';
import { AuthService } from './common-core/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  faCoffee = faCoffee;
  constructor(public auth: AuthService) {}
}
