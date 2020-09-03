import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private http: AuthService
  ) { }

  ngOnInit(): void {
  }

  async auth(){
    // window.location.href = 'https://discord.com/oauth2/authorize?client_id=747700459036213269&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20guilds'
    await this.http.auth()
    .then(w => {
      console.log(w);
    })
    .catch(e =>{
      console.log(e);
    })
  }

}
