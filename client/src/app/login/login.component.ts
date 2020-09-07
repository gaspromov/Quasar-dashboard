import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
    this.activatedRoute.queryParams.subscribe(params =>{
      if (params['code'])
        this.auth(params['code']);
    })
  }

  ngOnInit(): void {
  }

  
  async auth(code: string){
    await this.http.getUserData(code)
    .then(w =>{
      console.log(w);
      this.router.navigate(['/login']);
    })
    .catch(e => console.log('это ошибка -', e))
  }
}
