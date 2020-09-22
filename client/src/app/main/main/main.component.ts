import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  anchors;
  successes;
  dropId;
  checkout: boolean = false;

  constructor(
    private http: UsersService,
  ) { }

  async ngOnInit() {
    this.scroll();
    await this.getSuccesses();
    this.makeValidURL();
  }

    scroll(){
    this.anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of this.anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
      
        let blockID = anchor.getAttribute('href').substr(1)
      
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
      }
    }

  async getSuccesses(){
    await this.http.getSuccesses()
    .then(w => {
      this.successes = w;
    })
    .catch(e => console.log(e))
  }

  makeValidURL(){
    if (this.successes != undefined){
      for (let i = 0; i < this.successes.length; i++){
        this.successes[i].image = 'http://localhost:5000' + this.successes[i].image;
      }
      this.successes.reverse()
    }
  }
  
  onOpenCheckout(checkout: any = {}){
    console.log(checkout)
    this.checkout = checkout.drop;
    this.dropId = checkout.dropId;
  }

  onCloseCheckout(checkout: boolean){
    this.checkout = checkout;
  }


}
