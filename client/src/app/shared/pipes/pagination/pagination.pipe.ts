import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(arr: any = [], currentPage: number, onPage: number): unknown {
    let newArr: any = [];
    let start: number;
    let end: number;
    let length = arr.length;
    let endMore: boolean = false;
    let startMore: boolean = false;


    if (length > onPage + 2){

      if (onPage % 2 != 0)
        onPage= onPage + 1;;
      
      if (currentPage-onPage/2 -2 > 0){
        start = currentPage-onPage/2 - 1; 
        startMore = true;
      }
      else 
        start = 0;

      if (currentPage+onPage/2 < length-2){
        end = currentPage + onPage/2 - 1;
        endMore = true;
      }
      else 
        end = length - 1;
      
        console.log(start,end)
      if (startMore)
        newArr.push(1, 'more');
      newArr = newArr.concat(arr.slice(start, end+1));
      if (endMore)
        newArr.push('more', length)

    }
    else
      newArr = arr;

    
    return newArr;
  }

}
