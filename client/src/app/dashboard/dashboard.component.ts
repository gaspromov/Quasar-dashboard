import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: AuthService,
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
}
