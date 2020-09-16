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
    // console.log(this.params)
   }

  async ngOnInit() {
    // this.params = await this.activatedRoute.queryParams.toPromise()
    // console.log(this.params)
    console.log(this.successes);
  }

  ngOnChanges(){
    console.log(this.successes)
    if (this.successes != undefined)
      for (let i = 0; i < this.successes.length; i++){
        this.successes[i].image = 'http://localhost:5000/public' + this.successes[i].image;
        console.log(this.successes[i].image)
      }
  }

}
