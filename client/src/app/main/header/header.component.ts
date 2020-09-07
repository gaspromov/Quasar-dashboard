import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  params;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    // console.log(this.params)
   }

  async ngOnInit() {
    this.params = await this.activatedRoute.queryParams.toPromise()
    console.log(this.params)
  }

}
