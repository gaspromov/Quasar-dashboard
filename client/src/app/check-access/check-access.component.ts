import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-check-access',
  templateUrl: './check-access.component.html',
  styleUrls: ['./check-access.component.css']
})
export class CheckAccessComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { 
  }

  ngOnInit() {
    this.spinner.show();
    localStorage.setItem('member', 'true');
    this.router.navigate(['/dashboard']);
    this.spinner.hide();
  }

  
}
