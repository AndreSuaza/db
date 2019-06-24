import { Component, OnInit } from '@angular/core';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../entitys/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-profile',
  templateUrl: './load-profile.component.html',
  styleUrls: ['./load-profile.component.scss']
})
export class LoadProfileComponent implements OnInit {

  constructor(public authService: AuthService,
              public loadProfileService: LoadProfileService,
              private router: Router) {

    loadProfileService.getProfile(authService.user.uid).subscribe(
      (profile) => {
        loadProfileService.profile = profile;
        console.log('profile ', profile);
        this.router.navigate(['home']);
    });
  }

  ngOnInit() {
  }

}
