import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../shared/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};
  type: string;
  showPopup: boolean = false;
  headerPopup: string = '';
  messagePopup: string = '';

  constructor(
    private http: UsersService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    if (this.get_cookie('userType')){
      localStorage.setItem('member', 'true');
      document.cookie = "userType=''; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    }
    
  }

  get_cookie ( cookie_name ){
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if ( results )
      return ( unescape ( results[2] ) );
    else
      return false;
  }

  

  async onSendData(userData){
    if (userData == undefined || userData == null){
      await this.auth.logout()
        .then(() => this.auth.logoutCookie())
        .catch(() => this.auth.logoutCookie())
    }else{
      userData.createdAt = this.makeDate(userData.createdAt);
      if (userData.expiresIn)
        userData.expiresIn = this.makeDate(userData.expiresIn)
      this.type = userData.status;
      userData.status = userData.status.slice(0,1).toUpperCase() + userData.status.slice(1)
      this.userData = userData;
    }
  }

  makeDate(date: string){
    return date.slice(8, 10) + '.' + date.slice(5,7) + '.' + date.slice(0,4);
  }

  async unbind(){
    this.onConfirm(false);
    this.spinner.show();
    await this.http.unbind()
    .then(async w =>{
      await this.auth.logout()
      .then(() => this.auth.logoutCookie())
      .catch(() => this.auth.logoutCookie())
    })
    .catch(e =>{
      console.log(e);
    })
    this.spinner.hide();
  }

  confirm(type: string){
    if (type=="unbind"){
      this.headerPopup = "Отвязать ключ?"
      this.messagePopup = "Обязательно запишите куда-нибудь ключ!"
      this.showPopup = true;
    }
  }

  onConfirm(answere: boolean){
    if (answere)
      this.unbind();
    else{
      this.showPopup = false;
      this.headerPopup = ""
      this.messagePopup = ""
    }
  }

}
