import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
// import { PasswordGenerator } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { MonitorsComponent } from './main/monitors/monitors.component';
import { SuccessesComponent } from './main/successes/successes.component';
import { SocialComponent } from './main/social/social.component';
import { LoginComponent } from './login/login.component';
import { PasswordPageComponent } from './password-page/password-page.component';
import { WindowImagesComponent } from './window-images/window-images.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivateKeyComponent } from './activate-key/activate-key.component';
import { CheckAccessComponent } from './check-access/check-access.component';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HomeComponent } from './admin/home/home.component';
import { MembersComponent } from './admin/members/members.component';
import { NewSuccessComponent } from './admin/new-success/new-success.component';
import { NewDropComponent } from './admin/new-drop/new-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    NavbarComponent,
    MonitorsComponent,
    SuccessesComponent,
    SocialComponent,
    LoginComponent,
    PasswordPageComponent,
    WindowImagesComponent,
    DashboardComponent,
    ActivateKeyComponent,
    CheckAccessComponent,
    AdminAuthComponent,
    AdminPanelComponent,
    HomeComponent,
    MembersComponent,
    NewSuccessComponent,
    NewDropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    // PasswordGenerator,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
