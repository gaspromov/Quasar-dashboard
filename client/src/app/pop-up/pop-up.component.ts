import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() message: string = '';
  @Input() header: string = '';
  @Output() onConfirm = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  confirm(answere: boolean){
    this.onConfirm.emit(answere);
  }

}
