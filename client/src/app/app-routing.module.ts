import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './login/login.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { ActivateKeyComponent } from './activate-key/activate-key.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckAccessComponent } from './check-access/check-access.component';


const routes: Routes = [

  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'password', component: PasswordPageComponent },
  { path: 'activate-key', component: ActivateKeyComponent },
  { path: 'checking-access', component: CheckAccessComponent },
  { path: '**', redirectTo: '/main' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
