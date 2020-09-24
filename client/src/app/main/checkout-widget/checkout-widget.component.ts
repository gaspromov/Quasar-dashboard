import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() onCloseCheckout = new EventEmitter<boolean>();

  constructor(
    private http: DropService,
  ) { }

  async ngOnInit(){
    await this.getToken();
    this.checkout = new YandexCheckout({
      confirmation_token: this.token, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
      return_url: 'http://localhost:4200/login', //Ссылка на страницу завершения оплаты

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
        console.log(error);
      }
    });
    this.checkout.render('payment-form');

  }

  async getToken(){
    await this.http.getWidgetToken()
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

}
