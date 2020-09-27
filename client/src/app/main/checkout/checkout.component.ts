import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropService } from 'src/app/shared/drop/drop.service';
// declare const YandexCheckout:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cardForm: FormGroup;
  cardDate: string = '';
  // checkout = YandexCheckout(747566);
  @Output() onCloseCheckout = new EventEmitter<boolean>();
  @Input() dropId: string = '';

  constructor(
    private http: DropService,
    private router: Router
  ) { }

  ngOnInit() {
    let disabled = false;
    this.cardForm = new FormGroup({
      email: new FormControl({ value: '', disabled: disabled }),
      number: new FormControl({ value: '', disabled: disabled }),
      month: new FormControl({ value: '', disabled: disabled }),
      year: new FormControl({ value: '', disabled: disabled }),
      cvc: new FormControl({ value: '', disabled: disabled })
    })
  }

  async purshase(){
    // this.cardForm.value.month = this.cardDate.slice(0,2)
    // this.cardForm.value.year = this.cardDate.slice(2,5)
    // console.log(this.cardForm.value)
    // await this.checkout.tokenize(this.cardForm.value)
    // .then(async res => {
    //     console.log('dd')
    //     if (res.status  == 'success')
    //       await this.postPaymentToken(res.data.response.paymentToken);
    // })
    // .catch(e => {console.log(e)})
  }

  closeCheckout(checkout: boolean){
    this.onCloseCheckout.emit(checkout);
  }

  async postPaymentToken(paymentToken: string){
    await this.http.postPaymentToken(paymentToken, this.cardForm.value.email, this.dropId, this.generatePassword())
    .then(w => {
      localStorage.setItem('member', 'true');
      this.router.navigate(['/dashboard']);
    })
    .catch(e => console.log(e))
  }

  generatePassword() {
    let library = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ0123456789"
    let newPassword = "";
    for (var i = 0; i < 16; i++) {
      if (i == 4 || i == 8 || i == 12){
        newPassword += '-';
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
      else{
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
    }
    return newPassword;
  }

//   {status: "success", data: {…}}
// data:
// message: "Создан токен для платежа с карты"
// response:
// paymentToken:

}