import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Game } from '../entitys/Game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: AngularFirestoreCollection<Game>;
  constructor(private afs: AngularFirestore) {
    this.games = this.afs.collection<Game>('games');
   }

  setGame(idBattle: string, game: Game) {
    return this.games.doc(idBattle).set(game);
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
}
