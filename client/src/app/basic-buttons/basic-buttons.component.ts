import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { AdminAuthService } from '../shared/admin-auth/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: ['./basic-buttons.component.css']
})
export class BasicButtonsComponent {
  @Input() isAdmin: boolean = false;
  @Input() viewChanging: boolean = false;
  
  @Output() changingPassword = new EventEmitter<boolean>();
  subscribtion;


  constructor(
    private auth: AuthService,
    private router: Router,
    private adminAuth: AdminAuthService,
  ) { 
  }

  async logout(){
    if (this.isAdmin)
      this.adminAuth.logout();
    else{
      await this.auth.logout()
      .then(w =>{
        this.auth.logoutCookie();
      })
      .catch(e =>{
        this.auth.logoutCookie();
      })
    }
  }

  changePassword(){
    this.changingPassword.emit(true);
  }

}
