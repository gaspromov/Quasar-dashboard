import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../shared/auth/auth.service';
import { UsersService } from '../shared/users/users.service';

@Component({
  selector: 'app-check-access',
  templateUrl: './check-access.component.html',
  styleUrls: ['./check-access.component.css']
})
export class CheckAccessComponent implements OnInit {
  countChecking: number = 0;
  error: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: UsersService,
    private auth: AuthService,
  ) { 
  }

  async ngOnInit() {
    this.spinner.show();
    await this.checkingAccess();
  }

  async checkingAccess(){
    if (this.countChecking == 2){
      this.error = true;
    }
    setTimeout(async ()=>{
      await this.http.getUserData()
      .then( async (w: any ={}) => {
        if (w.license == undefined || w.license == null || w.license == ''){
          console.log("Лицензии нет. Повторная проверка...");
          this.countChecking++;
          this.checkingAccess()
        }
        else{
          localStorage.setItem('member', 'true');
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(async e => {
        if (e.status == 401){
          await this.auth.logout()
          .then(()=>{
            this.auth.logoutCookie();
          })
          .catch(()=>{
            this.auth.logoutCookie();
          })
        }
        else{
          console.log('Лицензии нет. Повторная проверка...');
          this.countChecking++;
          this.checkingAccess();
        }
      })
    }, 4000)
  }

  
}
