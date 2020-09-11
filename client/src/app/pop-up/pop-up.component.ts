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
    this.setBlur();
  }

  confirm(answere: boolean){
    this.unsetBlur();
    this.onConfirm.emit(answere);
  }

  setBlur(){
    let elements = document.querySelectorAll('#filter');
    for (let i = 0; i < elements.length; i++){
      elements[i].classList.add('blur')
    }
  }

  unsetBlur(){
    let elements = document.querySelectorAll('#filter');
    for (let i = 0; i < elements.length; i++){
      elements[i].classList.remove('blur')
    }
  }
  

}
