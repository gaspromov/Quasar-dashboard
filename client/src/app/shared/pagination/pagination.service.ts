import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  // Observable string sources
  private emitChangeItemsSource = new Subject<any>();
  // Observable string streams
  changeItems$ = this.emitChangeItemsSource.asObservable();
  

  constructor() { }

  
    // Service message commands
    emitChangeType(items) {
      this.emitChangeItemsSource.next(items);
    }
}
