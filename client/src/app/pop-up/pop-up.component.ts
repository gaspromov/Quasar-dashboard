import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  @Input() message: string = '';
  @Input() header: string = '';
  @Output() onConfirm = new EventEmitter<boolean>()
  @Input() warning: boolean = false;

  confirm(answere: boolean){
    this.onConfirm.emit(answere);
  }

}
