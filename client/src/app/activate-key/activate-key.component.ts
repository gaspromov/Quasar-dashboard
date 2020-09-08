import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-activate-key',
  templateUrl: './activate-key.component.html',
  styleUrls: ['./activate-key.component.css']
})
export class ActivateKeyComponent implements OnInit {
  avatar: string;
  username: string;
  discriminator: string;

  constructor(
    private http: AuthService
  ) { }

  async ngOnInit() {
    await this.http.getUserData()
    .then((w: any ={}) =>{
      console.log(w)
      this.avatar = w.avatar;
      // https://cdn.discordapp.com/
      this.username = w.username;
      this.discriminator = w.discriminator
    })
    .catch(e =>{
      console.log(e)
    })
  }

}
