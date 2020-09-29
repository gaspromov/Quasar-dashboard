import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPayments'
})
export class FilterPaymentsPipe implements PipeTransform {

  
  transform(arr: any = [], canceled: boolean, succeeded: boolean): unknown {
    let d: any = false;
    let i: any = false;

    if (canceled)
      d = "canceled";
    if (succeeded)
      i = "succeeded";
      
    
    if ( canceled || succeeded ){
      let filter = arr.filter(
        ell => ell.status.indexOf(d) === 0 || ell.status.indexOf(i) === 0);
      
      return filter;
    }

    return arr;
  }

}
