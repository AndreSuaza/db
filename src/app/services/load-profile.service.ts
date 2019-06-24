import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Profile } from '../entitys/profile';
import { Deck } from '../entitys/deck';
import { Card } from '../entitys/card';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadProfileService {

  private profileColl: AngularFirestoreCollection<Profile>;
  profile: Profile;
  constructor(private afs: AngularFirestore) {
    this.profileColl = this.afs.collection<Profile>('profile');
  }

   getProfile(user: string) {
    return this.profileColl
    .doc(user)
    .snapshotChanges()
    .pipe(
      map(a => {
        const data = a.payload.data() as Profile;
        return { ...data };
      })
    );
   }

   getDecks(user: string) {
    return this.profileColl
    .doc(user)
    .collection('decks')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Deck;
        return { ...data };
      }))
    );
   }

   getMainDeck(user: string, currentDeck: string) {
    return this.profileColl
    .doc(user)
    .collection('decks')
    .doc(currentDeck)
    .snapshotChanges()
    .pipe(
      map(a => {
        const data = a.payload.data() as Deck;
        return { ...data };
      })
    );
   }

   getSideDeck(user: string, currentDeck: string) {
    return this.profileColl
    .doc(user)
    .collection('decks')
    .doc(currentDeck)
    .collection('sideDeck')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Card[];
        return { ...data };
      }))
    );
   }

   setCurrentDeck(idUser: string, deck: Card[]) {
    console.log('setCurrentDeck', deck);
    return this.profileColl.doc(idUser).update({maindeck: deck});
   }

   setCurrentHand(idUser: string, hand: any) {
    return this.profileColl.doc(idUser).update({hand});
   }

   setCurrentBattle(idUser: string, idBattle: string) {
      return this.profileColl.doc(idUser).update({currentBattle: idBattle});
   }

   deleteBattle(idUser: string) {
    return this.profileColl.doc(idUser).update({currentBattle: ''});
  }
}
