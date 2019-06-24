import { Component, OnInit } from '@angular/core';
import { BattlesService } from '../../services/battles.service';
import { GameService } from '../../services/game.service';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Card } from '../../entitys/Card';
import { Game } from '../../entitys/Game';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  playerOne: string;
  playerTwo: string;
  leaderOne: Card;
  leaderTwo: Card;
  hand: Card[];
  deck: Card[];
  energiesOne: Card[];
  energiesTwo: Card[];
  combosOne: Card[];
  combosTwo: Card[];
  fightersOne: Card[];
  fightersTwo: Card[];
  dropOne: Card[];
  dropTwo: Card[];
  warpOne: Card[];
  warpTwo: Card[];
  handNumberOne: number;
  handNumberTwo: number;
  deckOne: number;
  deckTwo: number;

  constructor(battlesService: BattlesService,
              private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private loadProfileService: LoadProfileService,
              private authService: AuthService) {

    const idBattle = this.activatedRoute.snapshot.paramMap.get('id');
    battlesService.getBattle(idBattle).subscribe((battle) => {
      this.playerOne = battle.playerOne; this.playerTwo = battle.playerTwo;
      this.loadProfileService.getProfile(authService.user.uid).subscribe(
        (profile) => console.log('hand ', profile.hand, 'deck', profile.maindeck)
      );
    });
    gameService.getGame(idBattle).subscribe(
      (game) => this.setData(game)
    );
  }

  ngOnInit() {
  }

  setData(game: Game) {
    this.handNumberOne = game.handOne;
    this.handNumberTwo = game.handTwo;
    this.deckOne = game.deckOne;
    this.deckTwo = game.deckTwo;
  }
}
