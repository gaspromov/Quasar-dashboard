import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-drop',
  templateUrl: './new-drop.component.html',
  styleUrls: ['./new-drop.component.css']
})
export class NewDropComponent implements OnInit {
  dropForm: FormGroup;
  message: string;
  error: string;

  constructor() { }

  ngOnInit(): void {
    let disabled = false;
    this.dropForm = new FormGroup({
      password: new FormControl({ value: "", disabled: disabled }),
      date: new FormControl({ value: "", disabled: disabled }),
      time: new FormControl({ value: "", disabled: disabled }),
      quantity: new FormControl({ value: "", disabled: disabled })
    })
  }

  onAddDrop(){}

}
