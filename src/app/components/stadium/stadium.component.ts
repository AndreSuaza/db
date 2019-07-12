import { Component, OnInit } from '@angular/core';
import { BattlesService } from '../../services/battles.service';
import { Battle } from '../../entitys/Battle';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Profile } from '../../entitys/Profile';
import { GameService } from '../../services/game.service';
import { Game } from '../../entitys/Game';
import { Card } from '../../entitys/Card';

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
  loading = false;
  decks: any[];
  setdeck: string;

  constructor(public loadProfileService: LoadProfileService,
              public authService: AuthService,
              public battlesService: BattlesService,
              public gameService: GameService,
              private router: Router) {

    battlesService.getAllBattles().subscribe(
      (battles) => { this.battles = battles; });

    loadProfileService.getProfile().subscribe(
      (profile) => {
        if (profile.currentBattle !== '') {
          battlesService.getBattle(profile.currentBattle).subscribe(
            (battle) => {
              console.log ('battle state', battle.state);
              if (battle.state === 1) {
                if (profile.state === 2) {
                  this.router.navigate(['battle', profile.currentBattle]);
                }
                if (battle.idPlayerOne !== '' && battle.idPlayerTwo !== '') {
                  console.log('idPlayerTwo', battle.idPlayerTwo);
                  if (profile.namedeck === '') {
                    console.log ('elija su deck para poder jugar');
                  } else {
                    this.newGame(battle, profile);
                    loadProfileService.setState(2);
                  }
                }
              }
              if (battle.state === 0) {
                console.log('entra --- ');
                this.loadProfileService.setCurrentBattle('', 0);
              }
          });
      }
    });

    loadProfileService.getIdDecks().subscribe((decks) => { this.decks = decks; });
  }

  ngOnInit() {
  }

  createBattle(description: string = '', key: string = '') {
    const battleNew = {
      playerOne: this.authService.user.displayName,
      playerTwo: '',
      state: 1 ,
      idPlayerOne: this.authService.user.uid,
      idPlayerTwo: '',
      description,
      key } as Battle;

    this.battlesService.setBattle(battleNew)
      .then((battle) => {
        this.loadProfileService.setCurrentBattle(battle.id, 1);
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
      this.loadProfileService.setCurrentBattle(idBattle, 1).then(
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

  newGame(battle: Battle, profile: Profile) {
    this.loadProfileService.getMainDeck(profile.namedeck).subscribe((deck) => {
      profile.maindeck = deck.maindeck;
      profile.leader = deck.leader;
      profile.sidedeck = deck.sidedeck;
      this.draw(profile);
      if (this.authService.user.uid === battle.idPlayerOne) {
        this.setPlayerOne(battle.idBattle, 6, 36, profile.leader);
      }
      if (this.authService.user.uid === battle.idPlayerTwo) {
        this.setPlayerTwo(battle.idBattle, 6, 36, profile.leader);
      }

    });
  }

  draw(profile: Profile) {

    for (let i = 0; i < 1; i++) {
      profile.hand[i] = profile.maindeck[i];
      profile.maindeck.splice(i, 1);
    }

    this.loadProfileService.setCurrentDeck(profile.maindeck);
    this.loadProfileService.setCurrentHand(profile.hand);

  }

  setPlayerOne(idBattle: string, numberHand: number, numberDeck: number, leader: Card[]) {
    const gameNew: Game = {
      handOne: numberHand,
      deckOne: numberDeck,
      leaderOne: leader
    };
    this.gameService.setGame(idBattle, gameNew);
  }

  setPlayerTwo(idBattle: string, numberHand: number, numberDeck: number, leader: Card[]) {
    const gameNew: Game = {
      handTwo: numberHand,
      deckTwo: numberDeck,
      leaderTwo: leader
    };
    this.gameService.setGame(idBattle, gameNew);
  }

  setDefauldDeck(deckname: string) {
    this.loadProfileService.setDefouldDeck(deckname);
    this.setdeck = 'Successful assignment of the deck';
    console.log('message', this.setdeck);
  }
}
