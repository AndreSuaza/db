import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Game } from '../entitys/Game';
import { map } from 'rxjs/operators';
import { Card } from '../entitys/Card';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: AngularFirestoreCollection<Game>;
  idGame = '';
  player = '';
  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
    this.games = this.afs.collection<Game>('games');
   }

  getGame(idGame: string) {
    return this.games
    .doc(idGame)
    .snapshotChanges()
    .pipe(
     map(a => {
        const data = a.payload.data() as Game;
        return { ...data };
      })
    );
  }

  setGame(idBattle: string, game: Game) {
    this.getGame(idBattle).subscribe(
      (battle) => {
        if (battle.deckOne) {
          return this.games.doc(idBattle).update(game);
        } else {
          return this.games.doc(idBattle).set(game);
        }
      }
    );
  }

  getCards(collection: string, idgame: string) {
    return this.games
    .doc(idgame)
    .collection(collection)
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const idCard = a.payload.doc.id;
        const data = a.payload.doc.data() as Card[];
        return { idCard, ...data };
      }))
    );
  }

  setCards(collection: string, card: Card) {
    this.games.doc(this.idGame).collection(collection).doc(card.idCard).set(card);
  }

  dropCards(collection: string, idCard: string) {
    this.games.doc(this.idGame).collection(collection).doc(idCard).delete();
  }

}
