import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  avatar: string;
  username: string;
  discriminator: string;

  constructor(
    private http: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.spinner.show();
    await this.http.getUserData()
    .then((w: any ={}) =>{
      this.avatar = w.avatar;
      this.username = w.username;
      this.discriminator = w.discriminator
    })
    .catch(e =>{
      
    })
    this.spinner.hide();
  }

}
