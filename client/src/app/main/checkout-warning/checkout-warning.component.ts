import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-warning',
  templateUrl: './checkout-warning.component.html',
  styleUrls: ['./checkout-warning.component.css']
})
export class CheckoutWarningComponent implements OnInit {
  // @Input() error: boolean = false;
  @Input() password: string = '';

  constructor() { }

  ngOnInit(): void {
    this.password = `/?password=${this.password}`
  }

  reload(){
    window.location.reload();
  }

}
