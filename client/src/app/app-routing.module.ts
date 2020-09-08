import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './login/login.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { ActivateKeyComponent } from './activate-key/activate-key.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckAccessComponent } from './check-access/check-access.component';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';


const routes: Routes = [

  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'password', component: PasswordPageComponent },
  { path: 'license', component: ActivateKeyComponent },
  { path: 'checking-access', component: CheckAccessComponent },
  { path: 'admin', component: AdminAuthComponent },
  { path: '**', redirectTo: '/main' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
