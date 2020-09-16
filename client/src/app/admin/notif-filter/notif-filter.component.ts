import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notif-filter',
  templateUrl: './notif-filter.component.html',
  styleUrls: ['./notif-filter.component.css']
})
export class NotifFilterComponent implements OnInit {
  @Output() onChangeParams = new EventEmitter<{}>();
  sort: string = '';
  search: string = '';
  unbind: boolean = false;
  bind: boolean = false;
  expired: boolean = false;

  constructor() { }

  ngOnInit(){
  }

  onChange(){
    this.onChangeParams.emit({sort: this.sort, search: this.search, bind: this.bind, unbind: this.unbind, expired: this.expired});
  }


}
