import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  constructor(
    private http: AdminAuthService,
    private router: Router,
  ) { }

  ngOnInit(){
    let disabled = false;
    this.loginForm = new FormGroup({
      login: new FormControl({value: '', disabled: disabled}),
      password: new FormControl({value: '', disabled: disabled}),
    })
  }

  async auth(){
    await this.http.login(this.loginForm.value)
    .then( (w: any = {}) => {
      localStorage.setItem('accessToken', w.accessToken); 
      localStorage.setItem('userType', 'admin'); 
      this.router.navigate(['/admin-panel'])
    })
    .catch(e => {
      this.message = e.error;
    })
  }

}
