import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modal = 0;
  notifications;


  constructor(
    private http: AdminService,
    private auth: AdminAuthService
  ) { }

  async ngOnInit() {
    await this.http.getNotifications()
    .then(w => {
      if (w[0] != null)
        this.notifications = w;
    })
    .catch(e => {
      if (e.status = 401)
        this.auth.logout();
      else
        this.notifications = {length: '?'};
    })
  }

  showModal(modal: number){
    this.modal = modal;
  }

  hideModal(){
    this.modal = 0;
  }

}
