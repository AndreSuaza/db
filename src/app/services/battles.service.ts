import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Battle } from '../entitys/Battle';
import { Card } from '../entitys/Card';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BattlesService {
  private battles: AngularFirestoreCollection<Battle>;
  constructor(private afs: AngularFirestore) {
    this.battles = this.afs.collection<Battle>('battles');
  }

  getAllBattles() {
    return this.battles
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const idBattle = a.payload.doc.id;
          const battle = a.payload.doc.data() as Battle;
          return { idBattle, ...battle };
        }))
      );
  }

  getBattle(idBattle: string) {
    return this.battles
      .doc(idBattle)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as Battle;
          return { idBattle, ...data };
        })
      );
  }

  setBattle(battle: Battle) {
    return this.battles.add(battle);
  }

  setMainDeck(card: Card, battle: Battle) {
    return this.battles.doc(battle.idBattle).collection('mainDeckOne').add(card);
  }

  setPlayerTwoInBattle(idBattle: string, idPlayerTwo, nickName: string) {
    return this.battles.doc(idBattle).update({playerTwo: nickName, idPlayerTwo });
   }

  deleteBattle(idBattle: string ) {
    return this.battles.doc(idBattle).delete();
  }
}
