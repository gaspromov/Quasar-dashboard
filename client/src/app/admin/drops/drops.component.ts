import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-drops',
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.css']
})
export class DropsComponent implements OnInit {
  drops: any = [];
  outputDrops: any = [];

  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    ){}

  async ngOnInit() {
    await this.getDrops()
  }

  async getDrops(){
    this.spinner.show();
    await this.http.getDrops()
    .then(w => {
      this.drops = this.makeValidDate(w);
      this.spinner.hide();

    })
    .catch(e =>{
      if (e.status == 401)
        this.auth.logout();
      else 
        console.log(e);
    })
  }

  makeValidDate(arr: any = []){
    for (let i = 0; i < arr.length; i++){
      let date = new Date(arr[i].date)
      let day: any = Number(date.getDate());
      if (day < 10) day = '0' + day;
      let month: any = Number(date.getMonth()) + 1;
      if (month < 10) month = '0' + month;
      arr[i].date = date.getHours() + ':' + date.getMinutes() + '  ' + day + '.' + month + '.' + date.getFullYear();
    }
    return arr;
  }

  changeOutputDrops(drops: any){
    this.outputDrops = drops;
    if ( this.outputDrops.length < 15 ){
      for (let i=0; this.outputDrops.length < 15; i++){
        this.outputDrops.push({display: 'none'})
      }
    }
    this.cdr.detectChanges();
  }

}
