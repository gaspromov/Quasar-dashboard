import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.css']
})
export class FilterSortComponent implements OnInit {
  @Output() onChangeParams = new EventEmitter<{}>();
  sort: string = '';
  search: string = '';
  lifetime: boolean = false;
  renewal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    this.onChangeParams.emit({sort: this.sort, search: this.search, lifetime: this.lifetime, renewal: this.renewal});
  }


}
