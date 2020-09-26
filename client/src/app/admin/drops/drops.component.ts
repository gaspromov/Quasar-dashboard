import { Component, OnInit } from '@angular/core';
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
  ){}

  async ngOnInit() {
    await this.http.getDrops()
    .then(w => {
      this.drops = w;
    })
    .catch(e =>{
      if (e.status == 401)
        this.auth.logout();
      else 
        console.log(e);
    })
  }

}
