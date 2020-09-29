import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPayments'
})
export class SearchPaymentsPipe implements PipeTransform {

  transform(arr: any = [], searchParam: string): unknown {
    
    if ( searchParam != null && searchParam !== '' && searchParam != undefined){
      let filter = arr.filter(
        ell => {
          ell.metadata.username.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 ||
          ell.metadata.key.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 ||
          ell.date1.toLowerCase().indexOf(searchParam.toLowerCase()) === 0
        });
      return filter;
    }
    return arr;
  }

}
