import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrls: ['./new-key.component.css']
})
export class NewKeyComponent implements OnInit {
  addKeyForm: FormGroup;
  message: string;
  error: string;


  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
  ) { }

  ngOnInit() {
      let disabled = false;
      this.addKeyForm = new FormGroup({
      key: new FormControl({ value: '', disabled: disabled }),
      status: new FormControl({value: 'lifetime', disabled: disabled}),
      expiresIn: new FormControl({value: '', disabled: disabled})
    })
  }

  async onAddKey(){
    this.message = '';
    this.error = '';

    this.addKeyForm.value.expiresIn = new Date(this.addKeyForm.value.expiresIn);
    this.addKeyForm.value.key = this.generatePassword()
    this.http.newKey(this.addKeyForm.value)
    .then(w =>{
      this.message = `${this.addKeyForm.value.key}`
    })
    .catch(e=> {
      if (e.status == 401)
        this.auth.logout();
      else 
        this.error = e.error.message;
    })

  }
  

  generatePassword() {
    let library = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ0123456789"
    let newPassword = "";
    for (var i = 0; i < 16; i++) {
      if (i == 4 || i == 8 || i == 12){
        newPassword += '-';
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
      else{
        newPassword += library[Math.floor(Math.random()*library.length)];
      }
    }
    return newPassword;
  }

}
