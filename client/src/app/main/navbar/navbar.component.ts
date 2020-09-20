import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
// declare const YandexCheckout:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // checkout = YandexCheckout(747566);
  

  constructor(
    private http: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.checkout.tokenize({
    //     number: '5555555555554535',
    //     cvc: '888',
    //     month: '12',
    //     year: '24'
    // }).then(res => {
    //     console.log('dd')
    //     console.log(res)
    // })
    // .catch(e => {console.log(e)})
  }



}
