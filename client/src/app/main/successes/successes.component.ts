import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UsersService } from 'src/app/shared/users/users.service';

@Component({
  selector: 'app-successes',
  templateUrl: './successes.component.html',
  styleUrls: ['./successes.component.css']
})
export class SuccessesComponent implements OnInit, OnChanges {
  @Input() successes: any = []
  currentSuccess: any = {};
  numberSuccess;

  

  constructor(
    private http: UsersService,
  ) { }

  ngOnInit() {
  }
  
  ngOnChanges(){
    if (this.successes != undefined){
      this.successes = this.sortSuccesses(this.successes);
      for (let i = 0; i < this.successes.length; i++){
        this.successes[i].date = this.makeValidMonth(this.successes[i].date);
      }
      this.numberSuccess = this.successes.length - 1;
      this.currentSuccess = this.successes[this.numberSuccess];
    }
  }

  changeCurrentSuccess(i: number){
    if (this.numberSuccess == 0 && i == -1 || this.numberSuccess == (this.successes.length-1) && i == 1 ){
      return;
    }
    else{
      this.numberSuccess += i
      this.currentSuccess = this.successes[this.numberSuccess];
    }

  }

  makeValidMonth(date: string){
    let returnYear = `20${date.slice(2,5)}`;
    date = date.slice(0, 2);
    switch (date){
      case '01': return `Январь ${returnYear}`;
      case '02': return `Февраль ${returnYear}`;
      case '03': return `Март ${returnYear}`;
      case '04': return `Апрель ${returnYear}`;
      case '05': return `Май ${returnYear}`;
      case '06': return `Июнь ${returnYear}`;
      case '07': return `Июль ${returnYear}`;
      case '08': return `Август ${returnYear}`;
      case '09': return `Сентябрь ${returnYear}`;
      case '10': return `Октябрь ${returnYear}`;
      case '11': return `Ноябрь ${returnYear}`;
      case '12': return `Декабрь ${returnYear}`;
    }
  }

  sortSuccesses(arr){
    arr = arr.sort((function (a, b) {
      if (Number(a.date.slice(2,5) + a.date.slice(0,2)) < Number(b.date.slice(2,5) + b.date.slice(0,2))){
        return -1;
      }else if( Number(a.date.slice(2,5) + a.date.slice(0,2)) > Number(b.date.slice(2,5) + b.date.slice(0,2))){
        return 1;
      }else return 0;
    }))
    return arr;
  }

  
}
