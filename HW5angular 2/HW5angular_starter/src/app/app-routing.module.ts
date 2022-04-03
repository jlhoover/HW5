import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {SettingsComponent} from './settings/settings.component';
import {CreateComponent} from './create/create.component';
import {RankingsComponent} from './rankings/rankings.component';
const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'create', component: CreateComponent},
  {path: 'rankings', component: RankingsComponent},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
