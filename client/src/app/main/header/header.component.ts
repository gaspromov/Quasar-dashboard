import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'express-validator';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  params;
  subscribtion;
  drop: boolean = false;
  @Input() successes: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: UsersService,
    private auth: AuthService,
  ) {
    this.subscribtion = this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      this.checkPassword(params.password);
    })
   }

  ngOnInit() {
  }
  
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  ngOnChanges(){
  }

  async checkPassword(password: string){
    await this.http.checkPassword(password)
    .then(w =>{
      this.drop = true;
      console.log(this.drop)
    })
    .catch(e =>{
      console.log(e);
      if (e.status == 401)
        this.auth.logoutCookie();
      else 
        this.drop = false;

    })
  }



}
