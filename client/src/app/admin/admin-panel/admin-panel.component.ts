import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  password: string = "";
  error: string;
  message: string;

  constructor(
    private http: AdminAuthService,
  ) { }

  ngOnInit(){
  }

  async changePassword(){
    console.log(this.password)
    await this.http.changePassword(this.password)
    .then( (w: any = {}) =>{
      this.message = w.message;
      console.log(w, w.message)
    })
    .catch(e =>{
      this.error = e.error.message;
      console.log(e, e.error.message)
    })
  }
}
