import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { MonitorsComponent } from './main/monitors/monitors.component';
import { SuccessesComponent } from './main/successes/successes.component';
import { SocialComponent } from './main/social/social.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    NavbarComponent,
    MonitorsComponent,
    SuccessesComponent,
    SocialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
