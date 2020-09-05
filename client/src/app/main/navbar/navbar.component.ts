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
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if ( queryParams['code'] ){
        this.getUserData(queryParams['code']);
      }
    })
   }

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

  async getUserData(code){
    console.log(code)
    await this.http.getUserData(code)
    .then(w =>{
      console.log(w, 'w');
      console.log('w');
    })
    .catch(e =>{
      console.log(e, 'e');
      console.log('e');
    })
  }

}
