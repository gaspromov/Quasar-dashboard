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
import { UserAgreementComponent } from './user-agreement/user-agreement.component';

import { IsLoginGuard } from './shared/guards/is-login.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { IsAdminGuard } from './shared/guards/is-admin.guard';
import { IsMemberGuard } from './shared/guards/member/is-member.guard';
import { MemberGuard } from './shared/guards/member/member.guard';
import { NotificationsComponent } from './admin/notifications/notifications.component';
import { DropsComponent } from './admin/drops/drops.component';
import { LastPaymentsComponent } from './admin/last-payments/last-payments.component';



const routes: Routes = [

  // for all
  { path: '', component: MainComponent },
  { path: 'user_agreement', component: UserAgreementComponent },

  // no login
  { path: 'login', component: LoginComponent, canActivate: [IsLoginGuard] },

  // login
  { path: 'checking-access', component: CheckAccessComponent, canActivate: [LoginGuard]},
  { path: 'password', component: PasswordPageComponent, canActivate: [LoginGuard, IsMemberGuard] },
  { path: 'license', component: ActivateKeyComponent, canActivate: [LoginGuard, IsMemberGuard] },
  
  // have license
  { path: 'dashboard', component: DashboardComponent, canActivate: [MemberGuard] },

  // no admin
  { path: 'admin', component: AdminAuthComponent, canActivate: [IsAdminGuard] },

  // admin
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard], children:
    [
      { path: 'home', component: HomeComponent },
      { path: 'members', component: MembersComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'last-payments', component: LastPaymentsComponent },
      { path: 'drops', component: DropsComponent },
      { path: '**', redirectTo: '/admin-panel/home' }
    ] 
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
