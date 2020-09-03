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
    await this.http.auth()
    .then(w => {
      console.log(w);
    })
    .catch(e =>{
      console.log(e);
    })
  }

}
