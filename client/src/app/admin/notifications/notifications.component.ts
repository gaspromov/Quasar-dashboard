import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any = [];

  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
  ) { }

  async ngOnInit(){
    await this.getNotifications();
  }

  async getNotifications(){
    await this.http.getNotifications()
    .then(w => {
      this.notifications = w;
      console.log(this.notifications);
      for (let i = 0; i < this.notifications.length; i++){
        let date = new Date(this.notifications[i].date);

        this.notifications[i].date = this.makeValidDate(date.getDate()) + '.' + 
                                      this.makeValidDate((date.getMonth()+1)) + '.' + 
                                      this.makeValidDate(date.getFullYear());

        this.notifications[i].time = this.makeValidDate(date.getHours()) + ':' + 
                                      this.makeValidDate(date.getMinutes()) + ':' + 
                                      this.makeValidDate(date.getSeconds());
      }
    })
    .catch(e => {
      if (e.status == 401)
        this.auth.logout();
      else 
        console.log(e);
    })
  }

  async deleteNotifications(id){
    await this.http.deleteNotifications(id)
    .then( async () =>
      await this.getNotifications()
    )
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

}
