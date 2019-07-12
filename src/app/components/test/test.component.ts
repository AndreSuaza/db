import { Component, OnInit } from '@angular/core';
import { LoadProfileService } from '../../services/load-profile.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private loadProfileService: LoadProfileService) {
    console.log(loadProfileService.profile);
  }

  ngOnInit() {
  }

}
