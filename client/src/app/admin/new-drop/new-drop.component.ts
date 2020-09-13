import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-new-drop',
  templateUrl: './new-drop.component.html',
  styleUrls: ['./new-drop.component.css']
})
export class NewDropComponent implements OnInit {
  dropForm: FormGroup;
  message: string;
  error: string;

  date: string = '';
  time: string = '';

  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
  ) { }

  ngOnInit(): void {
    let disabled = false;
    this.dropForm = new FormGroup({
      password: new FormControl({ value: "", disabled: disabled }),
      date: new FormControl({ value: "", disabled: disabled }),
      quantity: new FormControl({ value: "", disabled: disabled })
    })
  }

  async onAddDrop(){
    this.error = '';
    this.message = '';

    this.dropForm.value.date = new Date(this.date + 'T' + this.time)
    await this.http.newDrop(this.dropForm.value)
    .then(() => {
      this.message = 'Дроп добавлен.'
      this.dropForm.reset();
      this.date = '';
      this.time = '';
    })
    .catch((e) => {
      if (e.status == 401)
        this.auth.logout();
      else
        this.error = e.error.message
    })
    console.log(this.dropForm.value)
  }

}
