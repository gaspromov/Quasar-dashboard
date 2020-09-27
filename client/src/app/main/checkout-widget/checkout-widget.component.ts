import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropService } from 'src/app/shared/drop/drop.service';
declare const YandexCheckout:any;

@Component({
  selector: 'app-checkout-widget',
  templateUrl: './checkout-widget.component.html',
  styleUrls: ['./checkout-widget.component.css']
})
export class CheckoutWidgetComponent implements OnInit {
  checkout;
  token: string;
  @Input() dropId: string = '';
  @Output() onCloseCheckout = new EventEmitter<boolean>();

  constructor(
    private http: DropService,
  ) { }

  async ngOnInit(){
    await this.getToken();
    this.checkout = new YandexCheckout({
      confirmation_token: this.token, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
      return_url: 'http://localhost:4200/checking-access', //Ссылка на страницу завершения оплаты

      customization: {
        //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
        colors: {
            //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля
            controlPrimary: '#21355B', //Значение цвета в HEX
            background: '#21355B', // Цвет фона платежной формы
            controlPrimaryContent: '#FFFFFF', // Цвет текста кнопки Заплатить
            controlSecondary: '#366093',
        }
      },

      error_callback(error) {
        window.location.href = 'http://localhost:4200';
        console.log(error, 'error');
      }
    });
    
    await this.checkout.render('payment-form');
    console.log('chtoto')

  }

  async getToken(){
    await this.http.getWidgetToken(this.generatePassword() ,this.dropId)
    .then((w:any = {}) => {
      this.token = w.confirmationToken;
    })
    .catch(e =>{
      console.log(e);
    })
  }

  
  closeCheckout(checkout: boolean){
    this.onCloseCheckout.emit(checkout);
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

}
