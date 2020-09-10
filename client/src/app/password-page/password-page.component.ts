import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.css']
})
export class PasswordPageComponent implements OnInit {
  avatar: string;
  username: string;
  discriminator: string;

  constructor(
    private http: AuthService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.spinner.show()
    console.log(document.cookie.split(";"))
    await this.http.getUserData()
    .then((w: any ={}) =>{
      console.log(w)
      this.avatar = w.avatar;
      this.username = w.username;
      this.discriminator = w.discriminator
    })
    .catch(e =>{
      console.log(e)
    })
    this.spinner.hide()
  }
}
