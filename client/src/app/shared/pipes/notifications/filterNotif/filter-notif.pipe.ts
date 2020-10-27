import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNotif'
})
export class FilterNotifPipe implements PipeTransform {

  transform(arr: any = [], unbind: boolean, bind: boolean, expired: boolean): unknown {
    let d = '1';
    let i = '1';
    let b = '1';

    if (unbind)
      d = "Unbind";
    if (bind)
      i = "Bind";
    if (expired)
      b = "Expired";
      
    
    if ( bind || unbind || expired ){
      let filter = arr.filter(
        ell =>  ell.type.indexOf(d) === 0 || ell.type.indexOf(i) === 0 || ell.type.indexOf(b) === 0);
      
      return filter;
    }

    return arr;
  }

}
