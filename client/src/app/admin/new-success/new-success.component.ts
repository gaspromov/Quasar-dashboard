import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-new-success',
  templateUrl: './new-success.component.html',
  styleUrls: ['./new-success.component.css']
})
export class NewSuccessComponent implements OnInit {
  successForm: FormGroup;
  message: string = '';
  error: string;
  imgSuccess: File;
  formData: FormData = new FormData();

  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
  ) { }

  ngOnInit(): void {
    let disabled = false;
    this.successForm = new FormGroup({
      month: new FormControl({value: '', disabled: disabled}),
      description: new FormControl({value: '', disabled: disabled}),
      image: new FormControl({value: '', disabled: disabled}),
    })
  }

  async onAddSuccess(){
    this.error = '';
    this.message = '';
    this.formData.set('date', this.successForm.value.month);
    this.formData.set('description', this.successForm.value.description);
    if (this.imgSuccess)
      this.formData.set('image', this.imgSuccess, this.imgSuccess.name);
    
    await this.http.postSuccess(this.formData)
    .then((w: any = {}) => {
      this.message = 'Добавлен.';
      this.formData = new FormData();
      this.imgSuccess = null;
      this.successForm.reset();
      document.getElementById(`file-upload`).innerHTML = 'Загрузить';
      document.getElementById(`file-upload`).classList.remove('danger-message');
      document.getElementById(`file-upload`).classList.remove('success-message');
    })
    .catch(e => {
      if (e.status == 401)
        this.auth.logout()
      else
        this.error = e.error.message;
    })
  }

  


  onAddFile(event){
    let confirm = document.getElementById(`file-upload`);
    let target = event.target || event.srcElement;
    let file = target.files[0];

    this.setMessage(file, confirm)
    
  }

  setMessage(file, confirm: Element){
    if (file){
      this.imgSuccess = file; 
      confirm.innerHTML = 'Загружен';
      confirm.classList.remove('danger-message');
      confirm.classList.add('success-message');
    }
    else{
      confirm.innerHTML = 'Не загружен!';
      confirm.classList.remove('success-message');
      confirm.classList.add('danger-message');
    }
  }


}
