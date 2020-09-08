import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  anchors;

  constructor() { }

  ngOnInit() {
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


}
