import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './login/login.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { ActivateKeyComponent } from './activate-key/activate-key.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckAccessComponent } from './check-access/check-access.component';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HomeComponent } from './admin/home/home.component';
import { MembersComponent } from './admin/members/members.component';

import { IsLoginGuard } from './shared/guards/is-login.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { IsAdminGuard } from './shared/guards/is-admin.guard';



const routes: Routes = [

  // for all
  { path: 'main', component: MainComponent },

  // no login
  { path: 'login', component: LoginComponent, canActivate: [IsLoginGuard] },

  // login
  { path: 'password', component: PasswordPageComponent, canActivate: [LoginGuard] },
  { path: 'license', component: ActivateKeyComponent, canActivate: [LoginGuard] },
  
  // have license
  { path: 'dashboard', component: DashboardComponent },

  // no admin
  { path: 'admin', component: AdminAuthComponent, canActivate: [IsAdminGuard] },

  // admin
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard], children:
    [
      { path: 'home', component: HomeComponent },
      { path: 'members', component: MembersComponent },
      { path: '**', redirectTo: '/admin-panel/home' }
    ] 
  },

  { path: '**', redirectTo: '/main' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
