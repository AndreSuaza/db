import { Injectable } from '@angular/core';
import { Card } from '../entitys/Card';
import { GameService } from './game.service';
import { LoadProfileService } from './load-profile.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  active = false;
  card: Card;
  event: any = null;
  coll: number;
  constructor(private gameService: GameService,
              private loadProfileService: LoadProfileService) { }

  menuPosition(posicion: string): string {
    if (posicion === 'x') {
      if (this.event != null) {  return this.event.x + 'px'; } else { return '0px'; }
    }
    if (posicion === 'y') {
      if (this.event != null) {  return this.event.y + 'px'; } else { return '0px'; }
    }
    return '0px';
}

  move(colDestination: number) {
      console.log('origen', this.coll, 'destino', colDestination);
      if ( this.coll === 1 || this.coll === 7 ) {
        this.loadProfileService.dropCards(this.menuCollection(this.coll), this.card.idCard);
      } else {
        console.log('entra con ', this.coll , this.card);
        this.gameService.dropCards(this.menuCollection(this.coll), this.card.idCard);
      }

      if ( colDestination === 1 || colDestination === 7 ) {
        this.loadProfileService.setCards(this.menuCollection(colDestination), this.card);
      } else {
        this.gameService.setCards(this.menuCollection(colDestination), this.card);
      }
  }

  showMenu() {
    this.active = true;
  }

  closeMenu() {
    this.active = false;
  }

  menuActions(collection: number, event, card: Card) {
    this.card = card;
    this.event = event;
    this.coll = collection;
    this.showMenu();
  }

  menuCollection(idColl: number) {
    switch (idColl) {
      case 1: {
        return 'hand';
      }
      case 2: {
         return 'fightersOne';
      }
      case 3: {
        return 'energiesOne';
      }
      case 4: {
        return 'combosOne';
      }
      case 5: {
        return 'dropOne';
      }
      case 6: {
        return 'warpOne';
      }
      case 7: {
        return 'deck';
      }
    }
  }

  use() {
    this.card.use = 'use';
  }
}
