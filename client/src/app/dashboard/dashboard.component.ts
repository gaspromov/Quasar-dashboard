import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../shared/auth/auth.service';
import { UsersService } from '../shared/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = {};

  constructor(
    private http: UsersService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }

  onSendData(userData: any = {}){
    userData.createdAt = this.makeDate(userData.createdAt)
    this.userData = userData;
  }

  makeDate(date: string){
    return date.slice(8, 10) + '.' + date.slice(5,7) + '.' + date.slice(0,4);
  
  }


  


}
