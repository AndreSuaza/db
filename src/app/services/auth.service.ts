import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    afAuth.user.subscribe((user) => { this.user = user; this.isloggedIn(user); });
  }

  subcribeAuth() {
    return this.afAuth.user;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logut() {
    this.afAuth.auth.signOut();
  }

  isloggedIn(user: any) {
    if (user !== null) {
      return true;
    } else {
      console.log('!isloggedIn');
     // this.router.navigate(['login']);
    }
  }
}
