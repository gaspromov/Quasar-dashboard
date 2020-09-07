import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: AuthService,
  ) { }

  ngOnInit(): void {
  }

  
  async auth(){
    await this.http.getUrl()
    .then( (w: any = {}) => {
      window.location.href = w.url;
    })
    .catch(e =>{
      console.log(e);

    })
  }
}
