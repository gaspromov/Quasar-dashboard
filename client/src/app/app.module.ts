import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivateKeyComponent } from './activate-key/activate-key.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
