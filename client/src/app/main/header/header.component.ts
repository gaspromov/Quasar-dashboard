import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UsersService } from 'src/app/shared/users/users.service';
import AOS from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  params;
  subscribtion;
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

  ngOnInit(){
    AOS.init({
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 50, // offset (in px) from the original trigger point
      delay: 50, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-top', // defines which position of the element regarding to window should trigger the animation
    
    });
  }
  
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  async checkPassword(password: string){
    await this.http.checkPassword(password)
    .then((w: string) =>{
      this.drop = true;
      this.dropId = w;
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
    this.onOpenCheckout.emit({ drop: this.drop, dropId: this.dropId });
  }



}
