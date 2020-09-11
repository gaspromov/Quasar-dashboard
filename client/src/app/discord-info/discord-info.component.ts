import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../shared/users/users.service';

@Component({
  selector: 'app-discord-info',
  templateUrl: './discord-info.component.html',
  styleUrls: ['./discord-info.component.css']
})
export class DiscordInfoComponent implements OnInit {
  @Input() border: boolean = false;
  @Input() showSpinner: boolean = true;
  @Output() onSendData = new EventEmitter<{}>();
  avatar: string;
  username: string;
  discriminator: string;
  
  constructor(
    private http: UsersService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
  ) { 
  }

  async ngOnInit(){
    this.spinner.show()
    await this.http.getUserData()
    .then((w: any ={}) =>{
      this.avatar = w.avatar;
      this.username = w.username;
      this.discriminator = w.discriminator
      this.sendData(w.license);
    })
    .catch(e =>{
      if (e.status == 401)
        this.auth.logoutCookie();
      else console.log(e)
    })
    this.spinner.hide()
  }

  sendData(data){
    this.onSendData.emit(data)
  }

}
