import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-check-access',
  templateUrl: './check-access.component.html',
  styleUrls: ['./check-access.component.css']
})
export class CheckAccessComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
  ) { 
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  
}
