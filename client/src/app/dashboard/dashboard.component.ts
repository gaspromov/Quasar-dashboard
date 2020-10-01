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

  typePopup: string = '';
  showPopup: boolean = false;
  popupWarning: boolean = false;
  headerPopup: string = '';
  messagePopup: string = '';

  subscribe: boolean = true;

  checkout: boolean = false;
  typeCheckout: string = '';

  unsubscription: boolean = false;

  constructor(
    private http: UsersService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
  ) { 

  }

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
      this.subscribe = userData.subscribe;
      if (userData.expiresIn)
        userData.expiresIn = this.makeDate(userData.expiresIn)
      else
        userData.expiresIn = 'xx.xx.xxxx';
      if (userData.card)
        userData.card.number = this.makeValidNumber(userData.card.first6, userData.card.last4);
      this.type = userData.status;
      if (this.subscribe == false && this.type != 'lifetime'){
        this.confirm('noSubscription');
      }
      userData.status = userData.status.slice(0,1).toUpperCase() + userData.status.slice(1)
      this.userData = userData;
    }
  }

  makeDate(date: string){
    return date.slice(8, 10) + '.' + date.slice(5,7) + '.' + date.slice(0,4);
  }

  makeValidNumber(first6: string, last4: string){
    return first6.slice(0,4) + ' ' + first6.slice(4,6) + '** **** ' + last4;
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
      if (e.status == 401)
        this.auth.logoutCookie();
      else
        console.log(e);
    })
    this.spinner.hide();
  }

  confirm(type: string){
    if (type=="unbind"){
      this.typePopup = "unbind";
      this.headerPopup = "Отвязать ключ?"
      this.messagePopup = "Обязательно запишите куда-нибудь ключ!"
      this.showPopup = true;
    }else
    if (type=="unsubscribe" && this.subscribe == false && this.type != 'lifetime'){
      this.typePopup = "unsubscribe";
      this.headerPopup = "Отвязать карту?"
      this.messagePopup = "По истечению даты действия подписки ключ будет удален навсегда!"
      this.showPopup = true;
    }else
    if (type=="unsubscribe" && this.subscribe==true && this.type != 'lifetime'){
      this.checkout = true;
      this.typeCheckout = 'subscribe';
    }else
    if (type=="subscribe" && this.type != 'lifetime'){
      this.subscribe = true;
      this.checkout = true;
      this.typeCheckout = 'subscribe';
    }else 
    if (type == 'change' && this.type != 'lifetime'){
      this.checkout = true;
      this.typeCheckout = 'changeCard';
    }else
    if (type == "noSubscription"){
      this.popupWarning = true;
      this.headerPopup = "Подписка отключена."
      this.messagePopup = "Привяжите карту, чтобы не потерять свой ключ навсегда."
      this.showPopup = true;
    }
  }

  onConfirm(answere: boolean){
    if (answere && this.typePopup == "unbind")
      this.unbind();
    else if (answere && this.typePopup == "unsubscribe")
      this.unsubscribe();
    else if (!answere && this.typePopup == 'unsubscribe'){
      this.subscribe = true;
      this.showPopup = false;
      this.typePopup = '';
      this.headerPopup = "";
      this.messagePopup = "";
      this.popupWarning = false;
    }else{
      this.showPopup = false;
      this.typePopup = '';
      this.headerPopup = "";
      this.messagePopup = "";
      this.popupWarning = false;
    }
  }

  async unsubscribe(){
    await this.http.changeSubscribe()
    .then(w => {
      this.onConfirm(false);
      this.unsubscription = !this.unsubscription;
    })
    .catch(e =>{
      if (e.status == 401)
        this.auth.logoutCookie();
      else 
        console.log(e);
    })
  }

  onCloseCheckout(close){
    this.checkout = close;
    if (this.typeCheckout == 'subscribe')
      this.subscribe = false;
  }

}
