import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.css']
})
export class FilterSortComponent {
  @Output() onChangeParams = new EventEmitter<{}>();
  sort: string = '';
  search: string = '';
  lifetime: boolean = false;
  renewal: boolean = false;

  onChange(){
    this.onChangeParams.emit({sort: this.sort, search: this.search, lifetime: this.lifetime, renewal: this.renewal});
  }


}
