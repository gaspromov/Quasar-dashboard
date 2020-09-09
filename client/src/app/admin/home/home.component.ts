import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newKey = false;
  newKeyForm: FormGroup;


  constructor(
    private http: AdminService,
    
  ) { }

  ngOnInit() {
    let disabled = false;
    this.newKeyForm = new FormGroup({
      status: new FormControl({value: '', disabled: disabled}),
      date: new FormControl({value: '', disabled: disabled})
    })
  }

  onNewKey(){
    this.newKey = !this.newKey
  }

  async onAddKey(){
    if (this.newKeyForm.value.status == 'lifetime')
      await this.http.newKey({key: this.generatePassword(), status: 'lifetime'}).then(w => console.log(w)).catch(e=> console.log(e))
    else 
      this.http.newKey({key: this.generatePassword(), status: 'renewval', date: this.newKeyForm.value.date}).then(w => console.log(w)).catch(e=> console.log(e))

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
