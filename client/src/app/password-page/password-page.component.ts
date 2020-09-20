import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { UsersService } from '../shared/users/users.service';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.css']
})
export class PasswordPageComponent implements OnInit {
  password: string = '';
  error: boolean = false;

  constructor(
    private http: UsersService,
    private auth: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
  }

  async checkPassword(){
    this.error = false;
    if (this.password == ''){
      this.error = true;
      return;
    }
    console.log(this.password)
    await this.http.checkPassword(this.password)
    .then(w => {
      console.log(w);
      this.router.navigate(['/'], { queryParams: { password: this.password }});
    })
    .catch(e =>{
      console.log(e);
      if (e.status == 401)
        this.auth.logoutCookie();
      else 
        this.error = true;
    })
  }
}
