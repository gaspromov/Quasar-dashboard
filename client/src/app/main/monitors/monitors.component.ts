import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hover(action: string){
    console.log(action)
  }

}
