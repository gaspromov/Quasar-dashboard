import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private http: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
    })
   }

  ngOnInit(): void {
  }

  async auth(){
    // window.location.href = ''
    // await this.http.auth()
    // .then( w => {
    //   console.log("это не ошибка", w);
    //   // window.location.href =
    //   // console.log(w.error);
    // })
    // .catch(e =>{
    //   console.log("это ошибка", e);
    //   // window.location.href =  e.error.text;

    // })
    
    
    fetch('http://localhost:3001/login/discord', {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    }
    }).then(result => console.log(result))
    // .then(console.log);
    
  }

}
