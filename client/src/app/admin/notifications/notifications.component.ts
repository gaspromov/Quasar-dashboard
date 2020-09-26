import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { FilterNotifPipe } from 'src/app/shared/pipes/notifications/filterNotif/filter-notif.pipe';
import { SearchNotifPipe } from 'src/app/shared/pipes/notifications/searchNotif/search-notif.pipe';
import { SortNotifPipe } from 'src/app/shared/pipes/notifications/sortNotif/sort-notif.pipe';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any = [];
  notifFilter: any = [];
  output: any = [];

  sort: string = '';
  search: string = '';
  expired: boolean = false;
  bind: boolean = false;
  unbind: boolean = false;  

  sorting = new SortNotifPipe();
  searching = new SearchNotifPipe();
  filter = new FilterNotifPipe();

  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
    ) { }

  async ngOnInit(){
    await this.getNotifications();
  }

  onChangeParams(params){
    this.unbind = params.unbind;
    this.bind = params.bind;
    this.expired = params.expired;
    this.search = params.search;
    this.sort = params.sort;
    this.notifFilter = this.makePipes(this.notifications);
  }

  makePipes(arr: any = []){
    arr = this.searching.transform(arr, this.search);
    arr = this.sorting.transform(arr, this.sort);
    arr = this.filter.transform(arr, this.unbind, this.bind, this.expired);
    return arr;
  }

  async getNotifications(){
    this.spinner.show();
    await this.http.getNotifications()
    .then((w: any = []) => {
      this.notifications = w.reverse();
      this.notifFilter = this.makePipes(w);
      for (let i = 0; i < this.notifications.length; i++){
        let date = new Date(this.notifications[i].date);

        this.notifications[i].date1 = this.makeValidDate(date.getDate()) + '.' + 
                                      this.makeValidDate((date.getMonth()+1)) + '.' + 
                                      this.makeValidDate(date.getFullYear());

        this.notifications[i].time = this.makeValidDate(date.getHours()) + ':' + 
                                      this.makeValidDate(date.getMinutes()) + ':' + 
                                      this.makeValidDate(date.getSeconds());
      }
      this.spinner.hide();
    })
    .catch(e => {
      if (e.status == 401)
        this.auth.logout();
      else 
        console.log(e);
    })
  }

  async deleteNotifications(id){
    this.spinner.show()
    await this.http.deleteNotifications(id)
    .then( async () =>{
      await this.getNotifications();
    })
    .catch(e => {
      if (e.status == 401)
        this.auth.logout();
      else 
        console.log(e);
    })
  }

  makeValidDate(date){
    return date < 10 ? `0${date}` : date
  }

  changeOutputNotifications(items){
    this.output = items;
    this.cdr.detectChanges();
  }

}
