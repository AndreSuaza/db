import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = null;
  constructor(public authService: AuthService) {
    this.user = authService.user;
  }

  ngOnInit() {
  }
}
