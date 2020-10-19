import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users/users.service';
import AOS from "aos";

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
  password: string = '';

  constructor(
    private http: UsersService,
  ) { }

  async ngOnInit() {
    this.scroll();
    await this.getSuccesses();
    this.makeValidURL();
    
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
      this.successes.reverse()
    }
  }
  
  onOpenCheckout(checkout: any = {}){
    this.checkout = checkout.drop;
    this.dropId = checkout.dropId;
    this.password = checkout.password
  }

  onCloseCheckout(checkout: boolean){
    this.checkout = checkout;
  }


}
