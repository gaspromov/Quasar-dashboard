import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private http: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.spinner.show()
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
    this.spinner.hide()
  }

}
