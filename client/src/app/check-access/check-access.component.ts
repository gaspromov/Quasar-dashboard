import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-check-access',
  templateUrl: './check-access.component.html',
  styleUrls: ['./check-access.component.css']
})
export class CheckAccessComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: AuthService,
  ) { 
    this.activatedRoute.queryParams.subscribe(params =>{
      if (params['code'])
        this.auth(params['code']);
    })
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  
  async auth(code: string){
    await this.http.getUserData()
    .then(w =>{
      console.log(w);
      localStorage.setItem('accessToken', JSON.stringify(w));
      this.router.navigate(['/password']);
    })
    .catch(e => {
      console.log('это ошибка -', e)
      this.router.navigate(['/password']);
    })
  }

}
