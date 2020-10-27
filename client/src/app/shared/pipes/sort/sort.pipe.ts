import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  
  

  transform(arr: any = [], sortParam: string): unknown {
    function makeValidDate(date: string){
      if (date != '-' && date != null && date != undefined && date != '')
        return Number(date.slice(6, 10) + date.slice(3,5) + date.slice(0,2));
      else 
        return 1;
    }

    if ( sortParam !== undefined){
      switch(sortParam){
        case "createdAt1":
          arr = arr.sort((function (a, b) {
            if ( makeValidDate(a.createdAt) > makeValidDate(b.createdAt)){
              return -1;
            }else if(makeValidDate(a.createdAt) < makeValidDate(b.createdAt)){
              return 1;
            }else return 0;
          }))
          break;
        case "createdAt2":
          arr = arr.sort((function (a, b) {
            if ( makeValidDate(a.createdAt) < makeValidDate(b.createdAt)){
              return -1;
            }else if(makeValidDate(a.createdAt) > makeValidDate(b.createdAt)){
              return 1;
            }else return 0;
          }))
          break;
        case "expiresIn1": 
          arr = arr.sort((function (a, b) {
            if ( makeValidDate(a.expiresIn) > makeValidDate(b.expiresIn)){
              return -1;
            }else if(makeValidDate(a.expiresIn) < makeValidDate(b.expiresIn)){
              return 1;
            }else return 0;
          }))
          break;
        case "expiresIn2":
          arr = arr.sort((function (a, b) {
            if ( makeValidDate(a.expiresIn) < makeValidDate(b.expiresIn)){
              return -1;
            }else if(makeValidDate(a.expiresIn) > makeValidDate(b.expiresIn)){
              return 1;
            }else return 0;
          }))
          break;
      }
    }
    return arr;
  }

  
  
}
