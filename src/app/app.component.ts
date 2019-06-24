import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dragonBall';
  user = null;
  constructor(public authService: AuthService) {
    authService.subcribeAuth().subscribe(
      (user) => {
        this.user = user;
        authService.isloggedIn(user);
    });
  }
}
