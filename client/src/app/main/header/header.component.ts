import { Component, EventEmitter, Input, OnDestroy, Output, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnChanges {
  params;
  subscribtion;
  password: string = '';
  drop: boolean = false;
  dropId: string = "";
  @Input() successes: any = [];
  @Output() onOpenCheckout = new EventEmitter<{}>()

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: UsersService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.subscribtion = this.activatedRoute.queryParams.subscribe(params => {
      if (params.password != '' && params.password != undefined)
        this.checkPassword(params.password);
    })
   }

  ngOnChanges(){
    if (this.successes != undefined){
      this.successes.reverse()
    }
  }
  
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  async checkPassword(password: string){
    await this.http.checkPassword(password)
    .then((w: string) =>{
      this.drop = true;
      this.dropId = w;
      this.password = password;
      
    })
    .catch(e =>{
      console.log(e);
      if (e.status == 401)
        this.auth.logoutCookie();
      else if (e.error.message == 'У вас уже есть подписка')
        this.drop = false;
      else 
        this.drop = false;

    })
  }

  openCheckout(){
    this.onOpenCheckout.emit({ drop: this.drop, dropId: this.dropId, password: this.password });
  }



}
