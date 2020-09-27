import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { AdminAuthService } from '../shared/admin-auth/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: ['./basic-buttons.component.css']
})
export class BasicButtonsComponent implements OnDestroy {
  @Input() isAdmin: boolean = false;
  viewChanging: boolean = false;
  @Output() changingPassword = new EventEmitter<boolean>();
  subscribtion;


  constructor(
    private auth: AuthService,
    private router: Router,
    private adminAuth: AdminAuthService,
  ) { 
    this.subscribtion = this.router.events.subscribe((event: any = {}) => 
      {
        if (event.url == '/admin-panel/home')
          this.viewChanging = true;
        else
          this.viewChanging = false;
      });
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
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
