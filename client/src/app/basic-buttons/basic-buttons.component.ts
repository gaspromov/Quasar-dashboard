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
      document.cookie = "discord.oauth2=''; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      this.router.navigate(['/login']);
    })
    .catch(e =>{
      document.cookie = "discord.oauth2=''; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      this.router.navigate(['/login']);
    }
    )
  }

}
