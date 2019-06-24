import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { BattlesService } from './services/battles.service';
import { GameService } from './services/game.service';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BattleComponent } from './components/battle/battle.component';
import { StadiumComponent } from './components/stadium/stadium.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { LoadProfileComponent } from './components/load-profile/load-profile.component';
import { LoadBattleComponent } from './components/load-battle/load-battle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    BattleComponent,
    StadiumComponent,
    BattlefieldComponent,
    LoadProfileComponent,
    LoadBattleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AngularFirestore,
    BattlesService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
