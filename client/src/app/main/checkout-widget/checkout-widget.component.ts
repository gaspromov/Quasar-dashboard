import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropService } from 'src/app/shared/drop/drop.service';
import { UsersService } from 'src/app/shared/users/users.service';
declare const YandexCheckout:any;

@Component({
  selector: 'app-checkout-widget',
  templateUrl: './checkout-widget.component.html',
  styleUrls: ['./checkout-widget.component.css']
})
export class CheckoutWidgetComponent implements OnInit {
  checkout;
  token: string;
  @Input() typeCheckout: string = 'drop';
  @Input() dropId: string = '';
  @Output() onCloseCheckout = new EventEmitter<boolean>();

  constructor(
    private http: DropService,
    private subscribeHTTP: UsersService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit(){
    this.spinner.show();
    await this.getToken();
    this.spinner.hide();
  }

  async getTokenSubscribe(){
    await this.subscribeHTTP.changeSubscribe()
    
  }

  async getToken(){
    if (this.typeCheckout == 'drop')
      await this.http.getWidgetToken(this.generatePassword() ,this.dropId)
      .then(async (w:any = {}) => {
        this.token = w.confirmationToken;
        await this.generateWidget();
      })
      .catch(e =>{
        console.log(e);
      })
    else if (this.typeCheckout == 'subscribe')
      await this.subscribeHTTP.changeSubscribe()
      .then(async (w:any = {}) => {
        this.token = w.confirmationToken;
        await this.generateWidget();
      })
      .catch(e =>{
        console.log(e);
      })
    else if (this.typeCheckout == 'changeCard')
      await this.subscribeHTTP.changeCard()
      .then(async(w:any = {}) => {
        this.token = w.confirmationToken;
        await this.generateWidget();
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

  async generateWidget(){
    this.checkout = await new YandexCheckout({
      confirmation_token: this.token, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
      return_url: 'https://quasarcook.com/checking-access', //Ссылка на страницу завершения оплаты

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
        window.location.href = 'https://quasarcook.com/checking-access';
        console.log(error, 'error');
      }
    });
     this.checkout.render('payment-form');
    // this.spinner.hide();

  }

}
