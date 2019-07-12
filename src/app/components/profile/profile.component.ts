import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadProfileService } from '../../services/load-profile.service';
import { Profile } from '../../entitys/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nickname = '';
  constructor(private authService: AuthService,
              private loadProfileService: LoadProfileService,
              private router: Router) {

  }

  ngOnInit() {
  }

  createProfile() {

    const profile: Profile = {
      nickname: this.nickname,
      currentBattle: '',
      hand: [],
      leader: [],
      lives: [],
      maindeck: [],
      sidedeck: [],
      namedeck: '',
      state: 0
    };

    if (this.nickname !== '') {
      this.loadProfileService.setProfile(this.authService.user.uid , profile);
      this.router.navigate(['home']);
    }

  }

}
