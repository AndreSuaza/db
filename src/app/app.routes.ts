import { Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BattleComponent } from './components/battle/battle.component';
import { LoadBattleComponent } from './components/load-battle/load-battle.component';
import { LoadDeckComponent } from './components/load-deck/load-deck.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestComponent } from './components/test/test.component';

export const appRoutes: Routes  = [
    { path: 'cargadeck',  component: LoadDeckComponent, canActivate: [AngularFireAuthGuard]  },
    { path: 'login',  component: LoginComponent },
    { path: 'home',  component: HomeComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'test',  component: TestComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'registry',  component: ProfileComponent, canActivate: [AngularFireAuthGuard] },
    { path: 'loadbattle/:id',  component: LoadBattleComponent, canActivate: [AngularFireAuthGuard]  },
    { path: 'battle/:id',  component: BattleComponent, canActivate: [AngularFireAuthGuard]  },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
