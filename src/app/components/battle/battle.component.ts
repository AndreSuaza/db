import { Component, OnInit } from '@angular/core';
import { BattlesService } from '../../services/battles.service';
import { GameService } from '../../services/game.service';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Card } from '../../entitys/Card';
import { Game } from '../../entitys/Game';
import { UtilService } from '../../services/utils.service';
import { MenuService } from '../../services/menu.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  one = 'One';
  two = 'Two';
  player = '';
  playerOne: string;
  playerTwo: string;
  init = {
    id: '',
    name: '',
    img: '',
    text: ''
  };
  leaderOne: any[];
  leaderTwo: any[];
  hand: any[];
  deck: any[];
  energiesOne: any[];
  energiesTwo: any[];
  combosOne: any[];
  combosTwo: any[];
  fightersOne: any[];
  fightersTwo: any[];
  dropOne: any[];
  dropTwo: any[];
  warpOne: any[];
  warpTwo: any[];
  handNumberOne = 0;
  handNumberTwo = 0;
  deckOne = 0;
  deckTwo = 0;
  idBattle: string;
  render = false;
  detailCard: Card;

  constructor(private battlesService: BattlesService,
              private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private authService: AuthService,
              private util: UtilService,
              public menuService: MenuService,
              private loadProfileService: LoadProfileService) {

    this.idBattle = this.activatedRoute.snapshot.paramMap.get('id');
    this.gameService.idGame = this.idBattle;
    battlesService.getBattle(this.idBattle).subscribe((battle) => {
      if (battle) {
        this.identifyPlayer(battle.idPlayerOne, battle.idPlayerTwo);
        this.loadPlayer();
      }
    });

    gameService.getGame(this.idBattle).subscribe((game) => { this.setData(game); });
    gameService.getCards('energies' + this.one, this.idBattle).subscribe((energiesOne) => {
      this.energiesOne = energiesOne;
      console.log('energiesOne', this.energiesOne); });
    gameService.getCards('energies' + this.two, this.idBattle).subscribe((energiesTwo) => this.energiesTwo = energiesTwo);
    gameService.getCards('combos' + this.one, this.idBattle).subscribe((combosOne) => this.combosOne = combosOne);
    gameService.getCards('combos' + this.two, this.idBattle).subscribe((combosTwo) => this.combosTwo = combosTwo);
    gameService.getCards('fighters' + this.one, this.idBattle).subscribe((fightersOne) => this.fightersOne = fightersOne);
    gameService.getCards('fighters' + this.two, this.idBattle).subscribe((fightersTwo) => this.fightersTwo = fightersTwo);
    gameService.getCards('drop' + this.one, this.idBattle).subscribe((dropOne) => this.dropOne = dropOne);
    gameService.getCards('drop' + this.two, this.idBattle).subscribe((dropTwo) => this.dropTwo = dropTwo);
    gameService.getCards('warp' + this.one, this.idBattle).subscribe((warpOne) => this.warpOne = warpOne);
    gameService.getCards('warp' + this.two, this.idBattle).subscribe((warpTwo) => this.warpTwo = warpTwo);

  }

  ngOnInit() {
  }

  setData(game: Game) {
    if (game !== {}) {
      this.handNumberOne = game.handOne;
      this.handNumberTwo = game.handTwo;
      this.deckOne = game.deckOne;
      this.deckTwo = game.deckTwo;
      this.leaderOne = game.leaderOne;
      this.leaderTwo = game.leaderTwo;
      this.render = true;
    }
  }

  endBattle() {
    this.battlesService.endBattle(this.idBattle);
  }

  detail(detailCard: Card) {
    this.detailCard = detailCard;
  }

  identifyPlayer(playerOne: string, playerTwo: string) {

    if (playerOne === this.authService.user.uid) {
      this.player = 'One';
    }
    if (playerTwo === this.authService.user.uid) {
      this.player = 'Two';
    }

    this.gameService.player = this.player;
  }

  loadPlayer() {
    if (this.player !== '') {
      this.loadProfileService.getCards('hand').subscribe((hand) => this.hand = hand );
    }
  }
}
