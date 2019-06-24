import { Component, OnInit } from '@angular/core';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { BattlesService } from '../../services/battles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../entitys/Game';
import { Card } from '../../entitys/Card';

@Component({
  selector: 'app-load-battle',
  templateUrl: './load-battle.component.html',
  styleUrls: ['./load-battle.component.scss']
})
export class LoadBattleComponent implements OnInit {
  profile;
  battle;
  deck: any[49] = [];

  constructor(private authService: AuthService,
              private loadProfileService: LoadProfileService,
              private battlesService: BattlesService,
              private activatedRoute: ActivatedRoute,
              private gameService: GameService,
              private router: Router) {
    // El estado del jugador o de la batalla debe definir que no se cargue mas;
    const idBattle = this.activatedRoute.snapshot.paramMap.get('id');
    battlesService.getBattle(idBattle).subscribe((battle) => {
      this.battle = battle;
      if (battle) {
        if (battle.idPlayerOne === authService.user.uid || battle.idPlayerTwo === authService.user.uid) {
        loadProfileService.getProfile(authService.user.uid).subscribe(
          (profile) => {
          loadProfileService.getMainDeck(authService.user.uid, profile.namedeck).subscribe(
            (deck) => {
              this.drawHand(idBattle, battle.idPlayerOne, battle.idPlayerTwo, authService.user.uid, deck.maindeck, profile.hand);
            });
        });
      } else {
        console.log('espectador');
      }
    }
  });
  }

  ngOnInit() {
  }

  drawHand(idBattle: string, idPlayerOne: string, idPlayerTwo: string, idUser: string, deck: Card[], hand: Card[] ) {
    for (let i = 0; i < 1; i++) {
      hand[i] = deck[i];
      deck.splice(i, 1);
    }
    this.loadProfileService.setCurrentDeck(idUser, deck);
    this.loadProfileService.setCurrentHand(idUser, hand);

    if (idUser === idPlayerOne) {
      this.setPlayerOne(idBattle, hand.length, deck.length);
    }
    if (idUser === idPlayerTwo) {
      this.setPlayerTwo(idBattle, hand.length, deck.length);
    }
  }

  setPlayerOne(idBattle: string, numberHand: number, numberDeck: number) {
    const gameNew: Game = {
      handOne: numberHand,
      deckOne: numberDeck,
    };
    this.gameService.setGame(idBattle, gameNew);
  }

  setPlayerTwo(idBattle: string, numberHand: number, numberDeck: number) {
    const gameNew: Game = {
      handTwo: numberHand,
      deckTwo: numberDeck,
    };
    this.gameService.setGame(idBattle, gameNew);
  }
}
