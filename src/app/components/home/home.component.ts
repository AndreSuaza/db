import { Component, OnInit } from '@angular/core';
import { LoadProfileService } from '../../services/load-profile.service';
import { Profile } from '../../entitys/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profile: Profile;
  constructor(private loadProfileService: LoadProfileService) {
    this.loadProfileService.getProfile().subscribe(
      (profile) => { if (profile) { this.profile = profile; } else { console.log('ir a crear Perfil '); }}
    );
  }

  ngOnInit() {
  }

}
