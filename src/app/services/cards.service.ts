import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Battle } from '../entitys/Battle';
import { Card } from '../entitys/Card';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cards: AngularFirestoreCollection<Card>;
  constructor(private afs: AngularFirestore) {
    this.cards = this.afs.collection<Card>('cards');
  }

  getCard(idCard: string) {
    return this.cards
      .doc(idCard)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as Card;
          return { ...data };
        })
      );
  }
}
