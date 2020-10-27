import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Output() onCloseChanging = new EventEmitter<boolean>();
  password: string = '';
  message: string ='';

  constructor(
    private http: AdminAuthService,
  ) { }

  ngOnInit(): void {
  }

  closeChanging(){
    this.onCloseChanging.emit(false);
  }

  async changePassword(){
    await this.http.changePassword(this.password)
    .then((w: any = {}) => {
      console.log(w)
      this.message = w.message;
    })
    .catch(e => {
      console.log(e);
      this.message = e.error.message;
    })
  }

}
