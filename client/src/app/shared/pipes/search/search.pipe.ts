import { unescapeIdentifier } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any = [], searchParam: string): unknown {
    
    if ( searchParam != null && searchParam !== '' && searchParam != undefined){
      let filter = arr.filter(
        ell => 
          ell.user.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 ||
          ell.key.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 ||
          ell.createdAt.toLowerCase().indexOf(searchParam.toLowerCase()) === 0 || 
          ell.expiresIn.toLowerCase().indexOf(searchParam.toLowerCase()) === 0
      );
      return filter;
    }
    return arr;
  }

}
