import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BattleComponent } from './components/battle/battle.component';
import { LoadProfileComponent } from './components/load-profile/load-profile.component';
import { LoadBattleComponent } from './components/load-battle/load-battle.component';

export const appRoutes: Routes  = [
    { path: 'login',  component: LoginComponent },
    { path: 'load',  component: LoadProfileComponent },
    { path: 'home',  component: HomeComponent },
    { path: 'loadbattle/:id',  component: LoadBattleComponent },
    { path: 'battle/:id',  component: BattleComponent },
    { path: '', redirectTo: 'load', pathMatch: 'full' },
    { path: '**', redirectTo: 'load', pathMatch: 'full' }
];
