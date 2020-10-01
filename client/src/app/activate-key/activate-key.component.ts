import { Component } from '@angular/core';
import { UsersService } from '../shared/users/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-activate-key',
  templateUrl: './activate-key.component.html',
  styleUrls: ['./activate-key.component.css']
})
export class ActivateKeyComponent{
  key: string = '';
  error: boolean = false;

  constructor(
    private http: UsersService,
    private router: Router,
    private auth: AuthService,
  ) { 
    console.log('license', document.cookie)
    

  }

  async bind(){
    
    if (this.key.length < 16){
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 1000);
      return;
    }
    this.error = false;
    await this.http.bind(this.makeValidKey(this.key))
    .then(()=> {
      localStorage.setItem('member', 'true');
      this.router.navigate(['/dashboard']);
    })
    .catch(e => {
      if (e.status == 401)
        this.auth.logoutCookie();
      else{
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 1000);
      }
        
    })
    
  }

  makeValidKey(key: string){
    let validKey: string = '';
    
    for (var i = 0; i < 16; i++) {
      if (i == 4 || i == 8 || i == 12){
        validKey += '-';
        validKey += key[i]
      }
      else{
        validKey += key[i]
      }
    }
    return validKey;
  }

}
