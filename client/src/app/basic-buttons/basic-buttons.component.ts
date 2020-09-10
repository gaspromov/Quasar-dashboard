import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: ['./basic-buttons.component.css']
})
export class BasicButtonsComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    
    this.auth.logout()
    .then(w =>{
      this.auth.logoutCookie()
    })
    .catch(e =>{
      this.auth.logoutCookie()
    }
    )
  }

}
