import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Profile } from '../entitys/profile';
import { Deck } from '../entitys/deck';
import { Card } from '../entitys/card';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadProfileService {

  private profiles: AngularFirestoreCollection<Profile>;
  profile;
  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              private router: Router) {
    this.profiles = this.afs.collection<Profile>('profile');
    this.getProfile().subscribe(
      (profile) => { if (!profile.nickname) { this.profile = profile; this.router.navigate(['registry']); }}
    );
  }

  getCards(collection: string) {
    return this.profiles.doc(this.authService.user.uid)
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
    return this.profiles.doc(this.authService.user.uid).collection(collection).doc(card.idCard).set(card);
  }

  dropCards(collection: string, idCard: string) {
    return this.profiles.doc(this.authService.user.uid).collection(collection).doc(idCard).delete();
  }

  getProfile() {
    return this.profiles
    .doc(this.authService.user.uid)
    .snapshotChanges()
    .pipe(
      map(a => {
        const data = a.payload.data() as Profile;
        return { ...data };
      })
    );
   }

   getDecks() {
    return this.profiles
    .doc(this.authService.user.uid)
    .collection('decks')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const iddeck = a.payload.doc.id;
        const data = a.payload.doc.data() as Deck[];
        return { iddeck, ...data };
      }))
    );
   }

   getIdDecks() {
    return this.profiles
    .doc(this.authService.user.uid)
    .collection('decks')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const iddeck = a.payload.doc.id as string;
        return { iddeck };
      }))
    );
   }

   getMainDeck(currentDeck: string) {
    return this.profiles
    .doc(this.authService.user.uid)
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
    return this.profiles
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

   setProfile(idUser: string, profile: Profile) {
    return this.profiles.doc(idUser).set(profile);
   }

   setDefouldDeck(nameDeck: string) {
    return this.profiles.doc(this.authService.user.uid).update({namedeck: nameDeck});
   }

   setCurrentDeck(maindeck: Card[]) {
    return this.profiles.doc(this.authService.user.uid).update({maindeck});
   }

   setCurrentSideDeck(sidedeck: Card[]) {
    return this.profiles.doc(this.authService.user.uid).update({sidedeck});
   }

   setCurrentHand(hand: Card[]) {
    return this.profiles.doc(this.authService.user.uid).update({hand});
   }

   setCurrentLives(lives: Card[]) {
    return this.profiles.doc(this.authService.user.uid).update({lives});
   }

   setCurrentBattle(idBattle: string, state: number) {
      return this.profiles.doc(this.authService.user.uid).update({currentBattle: idBattle, state});
   }

   setDeck(idUser: string, deck: Deck) {
      return this.profiles.doc(idUser).collection('decks').doc(deck.name).set(deck);
   }

   setState(state: number) {
    return this.profiles.doc(this.authService.user.uid).update({state});
   }

   deleteBattle(idUser: string) {
    return this.profiles.doc(idUser).update({currentBattle: ''});
  }
}
