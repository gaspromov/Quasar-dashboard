import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../shared/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discord-info',
  templateUrl: './discord-info.component.html',
  styleUrls: ['./discord-info.component.css']
})
export class DiscordInfoComponent implements OnInit, OnChanges {
  @Input() border: boolean = false;
  @Input() showSpinner: boolean = true;
  @Output() onSendData = new EventEmitter<{}>();
  @Input() changingData: boolean = false;
  avatar: string;
  username: string;
  discriminator: string;
  
  constructor(
    private http: UsersService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  async ngOnInit(){
    this.spinner.show()
    await this.getUserData();
    this.spinner.hide()
  }

  ngOnChanges(){
    if (this.changingData = true){
      this.ngOnInit();
    }
  }

  async getUserData(){
    await this.http.getUserData()
    .then((w: any ={}) =>{
      this.avatar = w.avatar;
      this.username = w.username;
      this.discriminator = w.discriminator
      if (w.license && localStorage.getItem('member') !=='true'){
        localStorage.setItem('member', 'true');
        this.router.navigate(['/dashboard']);
        return;
      }

      this.sendData(w.license);
    })
    .catch(e =>{
      if (e.status == 401){
        this.auth.logoutCookie();
      }
    })
  }

  sendData(data){
    this.onSendData.emit(data)
  }

}
