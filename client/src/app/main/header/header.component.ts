import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Output() onOpenCheckout = new EventEmitter<boolean>()

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
    })
    .catch(e =>{
      console.log(e);
      if (e.status == 401)
        this.auth.logoutCookie();
      else if (e.error.message == 'У вас уже есть подписка')
        this.router.navigate(['/dashboard']);
      else 
        this.drop = false;

    })
  }

  openCheckout(){
    this.onOpenCheckout.emit(true);
  }



}
