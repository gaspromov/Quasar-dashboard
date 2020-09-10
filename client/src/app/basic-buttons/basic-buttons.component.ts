import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: ['./basic-buttons.component.css']
})
export class BasicButtonsComponent implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout()
    .then(w =>{
      document.cookie = "discord.oauth2=''; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    })
    .catch(e => console.log(e))
  }

}
