import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'filterMembers'
})
export class FilterMembersPipe implements PipeTransform {

  transform(arr: any = [], lifetime: boolean, renewal: boolean): unknown {
    let d = '1';
    let i = '1';

    if (renewal)
      d = "renewal";
    if (lifetime)
      i = "lifetime";
      
    
    if ( renewal || lifetime ){
      let filter = arr.filter(
        ell =>  ell.status.indexOf(d) === 0 || ell.status.indexOf(i) === 0
      );
      
      return filter;
    }

    return arr;
  }

}
