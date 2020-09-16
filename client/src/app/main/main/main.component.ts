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

  constructor(
    private http: UsersService,
  ) { }

  async ngOnInit() {
    this.scroll();
    await this.getSuccesses();
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
      console.log(w)
      this.successes = w;
      console.log(this.successes)
    })
    .catch(e => console.log(e))
  }
  


}
