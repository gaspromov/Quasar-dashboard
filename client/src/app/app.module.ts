import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxMaskModule} from "ngx-mask";
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
import { BasicButtonsComponent } from './basic-buttons/basic-buttons.component';
import { DiscordInfoComponent } from './discord-info/discord-info.component';
import { NewKeyComponent } from './admin/new-key/new-key.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchPipe } from './shared/pipes/search/search.pipe';
import { FilterMembersPipe } from './shared/pipes/filterMembers/filter-members.pipe';
import { SortPipe } from './shared/pipes/sort/sort.pipe';
import { FilterSortComponent } from './admin/filter-sort/filter-sort.component';
import { NotificationsComponent } from './admin/notifications/notifications.component';
import { NotifFilterComponent } from './admin/notif-filter/notif-filter.component';
import { FooterComponent } from './main/footer/footer.component';
import { SearchNotifPipe } from './shared/pipes/notifications/searchNotif/search-notif.pipe';
import { FilterNotifPipe } from './shared/pipes/notifications/filterNotif/filter-notif.pipe';
import { SortNotifPipe } from './shared/pipes/notifications/sortNotif/sort-notif.pipe';
import { CheckoutComponent } from './main/checkout/checkout.component'

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
    DashboardComponent,
    ActivateKeyComponent,
    CheckAccessComponent,
    AdminAuthComponent,
    AdminPanelComponent,
    HomeComponent,
    MembersComponent,
    NewSuccessComponent,
    NewDropComponent,
    BasicButtonsComponent,
    DiscordInfoComponent,
    NewKeyComponent,
    PopUpComponent,
    PaginationComponent,
    SearchPipe,
    FilterMembersPipe,
    SortPipe,
    FilterSortComponent,
    NotificationsComponent,
    NotifFilterComponent,
    FooterComponent,
    SearchNotifPipe,
    FilterNotifPipe,
    SortNotifPipe,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(/*options*/),
    // PasswordGenerator,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
