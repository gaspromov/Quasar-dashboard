import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchNotif'
})
export class SearchNotifPipe implements PipeTransform {

  transform(arr: any = [], searchParam: string): unknown {
    
    if ( searchParam != null && searchParam !== '' && searchParam != undefined){
      let filter = arr.filter(
        ell => 
          ell.user.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 ||
          ell.license.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 ||
          ell.date1.toLowerCase().indexOf(searchParam.toLowerCase()) === 0
      );
      return filter;
    }
    return arr;
  }

}
