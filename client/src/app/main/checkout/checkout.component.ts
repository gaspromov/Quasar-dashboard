import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropService } from 'src/app/shared/drop/drop.service';
declare const YandexCheckout:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cardForm: FormGroup;
  cardDate: string = '';
  checkout = YandexCheckout(747566);
  @Output() onCloseCheckout = new EventEmitter<boolean>();

  constructor(
    private http: DropService
  ) { }

  ngOnInit() {
    let disabled = false;
    this.cardForm = new FormGroup({
      number: new FormControl({ value: '', disabled: disabled }),
      month: new FormControl({ value: '', disabled: disabled }),
      year: new FormControl({ value: '', disabled: disabled }),
      cvc: new FormControl({ value: '', disabled: disabled })
    })
  }

  async purshase(){
    this.cardForm.value.month = this.cardDate.slice(0,2)
    this.cardForm.value.year = this.cardDate.slice(2,5)
    console.log(this.cardForm.value)
    await this.checkout.tokenize(this.cardForm.value)
    .then(async res => {
        console.log('dd')
        if (res.status  == 'success')
          await this.postPaymentToken(res.data.response.paymentToken);
    })
    .catch(e => {console.log(e)})
  }

  closeCheckout(checkout: boolean){
    this.onCloseCheckout.emit(checkout);
  }

  async postPaymentToken(paymentToken: string){
    await this.http.postPaymentToken(paymentToken)
    .then(w => console.log(w))
    .catch(e => console.log(e))
  }

//   {status: "success", data: {…}}
// data:
// message: "Создан токен для платежа с карты"
// response:
// paymentToken:

}
