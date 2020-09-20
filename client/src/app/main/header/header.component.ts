import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  params;
  @Input() successes: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
   }

  async ngOnInit() {
    console.log(this.successes);
  }

  ngOnChanges(){
    console.log(this.successes)
  }

}
