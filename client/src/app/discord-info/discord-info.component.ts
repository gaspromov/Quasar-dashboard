import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-discord-info',
  templateUrl: './discord-info.component.html',
  styleUrls: ['./discord-info.component.css']
})
export class DiscordInfoComponent implements OnInit {
  @Input() border: boolean = false;
  @Input() showSpinner: boolean = true;
  avatar: string;
  username: string;
  discriminator: string;
  
  constructor(
    private http: AuthService,
    private spinner: NgxSpinnerService,
  ) { 
  }

  async ngOnInit() {
    this.spinner.show()
    await this.http.getUserData()
    .then((w: any ={}) =>{
      this.avatar = w.avatar;
      this.username = w.username;
      this.discriminator = w.discriminator
    })
    .catch(e =>{
      if (e.status == 401)
        this.http.logoutCookie();
      else console.log(e)
    })
    this.spinner.hide()
  }

}
