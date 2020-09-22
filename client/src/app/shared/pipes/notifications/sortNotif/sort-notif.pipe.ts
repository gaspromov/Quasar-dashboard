import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNotif'
})
export class SortNotifPipe implements PipeTransform {

  transform(arr: any = [], sortParam: string): unknown {
    
    function makeValidDate(ell: any = {}){
      let date = Number(ell.date1.slice(6, 10) + ell.date1.slice(3,5) + ell.date1.slice(0,2) + ell.time.slice(0, 2) + ell.time.slice(3,5) + ell.time.slice(6,8));
      return date;
    }

    if ( sortParam !== undefined){
      switch(sortParam){
        case "date1":
          arr = arr.sort((function (a, b) {
            if ( makeValidDate(a) > makeValidDate(b)){
              return -1;
            }else if(makeValidDate(a) < makeValidDate(b)){
              return 1;
            }else return 0;
          }))
          break;
        case "date2":
          arr = arr.sort((function (a, b) {
            if ( makeValidDate(a) < makeValidDate(b)){
              return -1;
            }else if(makeValidDate(a) > makeValidDate(b)){
              return 1;
            }else return 0;
          }))
          break;
      }
    }
    return arr;
  }

}
