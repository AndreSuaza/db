import { Component, OnInit } from '@angular/core';
import { BattlesService } from '../../services/battles.service';
import { Battle } from '../../entitys/Battle';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.scss']
})
export class StadiumComponent implements OnInit {
  battles: any[];
  typeBattles = 1;
  typeBattleText = 'Battles In Progress';
  user;
  stun: boolean;
  profile;
  constructor(public loadProfileService: LoadProfileService,
              public authService: AuthService,
              public battlesService: BattlesService,
              private router: Router) {

    battlesService.getAllBattles().subscribe(
      (battles) => {
        this.battles = battles;
        battles.forEach((battle) => {
          if (battle.playerOne !== '' && battle.playerTwo !== '') {
            this.router.navigate(['loadbattle', battle.idBattle]);
          }
        });
      });
    loadProfileService.getProfile(authService.user.uid).subscribe(
      (profile) => {
        if (profile.currentBattle) { this.profile = profile; this.stun = true; } else { this.stun = false; }
    });
   }

  ngOnInit() {
  }

  createBattle(description: string = '', key: string = '') {
    const battleNew = {
      playerOne: this.authService.user.displayName,
      playerTwo: '',
      state: 1 ,
      idPlayerOne: this.authService.user.uid,
      description,
      key } as Battle;

    this.battlesService.setBattle(battleNew)
      .then((battle) => {
        this.loadProfileService.setCurrentBattle(this.authService.user.uid, battle.id);
      });
  }

  getTypeBattles() {

    if (this.typeBattles === 1) {
        this.typeBattles = 0;
        this.typeBattleText = 'Free Battles';
    } else {
        this.typeBattles = 1;
        this.typeBattleText = 'Battles In Progress';
    }
  }

  comeInBattle(idBattle: string) {
    if (!this.stun) {
      this.loadProfileService.setCurrentBattle(this.authService.user.uid, idBattle).then(
        () => this.battlesService.setPlayerTwoInBattle(idBattle, this.authService.user.uid, this.authService.user.displayName)
      );
    }
  }

  deleteBattle() {
    if (this.stun) {
      this.battlesService.deleteBattle(this.profile.currentBattle)
      .then(() => this.loadProfileService.deleteBattle(this.authService.user.uid));
      this.stun = false;
    }
  }
}
