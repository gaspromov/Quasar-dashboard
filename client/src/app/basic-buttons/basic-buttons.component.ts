import { Component, Input } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { AdminAuthService } from '../shared/admin-auth/admin-auth.service';

@Component({
  selector: 'app-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: ['./basic-buttons.component.css']
})
export class BasicButtonsComponent {
  @Input() isAdmin: boolean = false;

  constructor(
    private auth: AuthService,
    private adminAuth: AdminAuthService,
  ) { }


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

}
