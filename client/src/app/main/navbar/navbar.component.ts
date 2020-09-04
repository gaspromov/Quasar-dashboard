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
    // window.location.href = ''
    await this.http.auth()
    .then( (w: any ={}) => {
      console.log("это не ошибка", w);
      // window.location.href =
      // console.log(w.error);
    })
    .catch(e =>{
      console.log("это ошибка", e);
      // window.location.href =  e.error.text;

    })
  }

}
