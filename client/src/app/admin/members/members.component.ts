import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  keys: any = [];
  outputKeys: any = [];
  sort: string = '';
  search: string = '';
  lifetime: boolean = false;
  renewal: boolean = false;

  showPopup = false;
  headerPopup: string = 'Подтверждение';
  messagePopup: string = "Вы уверены, что хотите удалить ключ?";

  deleteKeyId: string = '';
  editKeyId: string = '';
  editStatus: string = '';
  editExpiresIn: string = '';

  constructor(
    private http: AdminService,
    private auth: AdminAuthService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) { 
  }

  async ngOnInit() {
    await this.getKeys();
  }

  async getKeys(){
    this.spinner.show();
    await this.http.getKeys()
    .then(w =>{
      this.keys = this.makeValidData(w);
      console.log(this.keys)
      this.spinner.hide();
      
    })
    .catch(e => {
      if (e.status = 401)
        this.auth.logout();
    })

  }

  makeValidData(arr: any = [{}]){
    for (let i = 0; i < arr.length; i++){
      arr[i].createdAt = this.makeDate(arr[i].createdAt);
      if (arr[i].expiresIn)
        arr[i].expiresIn = this.makeDate(arr[i].expiresIn);
      else 
        arr[i].expiresIn = '-';
      if (arr[i].user)
        arr[i].user = arr[i].user.fullName;
      else 
        arr[i].user = "";
    }
    return arr;
  }

  makeDate(date: string){
    return date.slice(8, 10) + '.' + date.slice(5,7) + '.' + date.slice(0,4);
  }

  changeOutputservers(keys){
    this.outputKeys = keys;
    if ( this.outputKeys.length < 15 ){
      for (let i=0; this.outputKeys.length < 15; i++){
        this.outputKeys.push({display: 'none'})
      }
    }
    this.cdr.detectChanges();
  }

  onChangeParams(params: any = {}){
    this.lifetime = params.lifetime;
    this.renewal = params.renewal;
    this.search = params.search;
    this.sort = params.sort;
  }

  
  onConfirm(answere: boolean){
    if (answere){
      this.deleteKey();
      this.showPopup = false; 
    }
    else
      this.showPopup = false;
  }

  onDeleteKey(id){
    this.deleteKeyId = id;
    this.showPopup = true;
  }

  async deleteKey(){
    this.spinner.show();
    await this.http.deleteKey(this.deleteKeyId)
    .then(async () => {
      await this.getKeys();
    })
    .catch(e => {
      if (e.status == 401)
        this.auth.logout();
    })
  }

  onEditKey(id){
    this.editKeyId = id;
    
    let ell = this.keys.filter(
      ell => ell._id.toLowerCase().indexOf(id.toLowerCase()) === 0);
    console.log(ell)
    
    this.editStatus = ell[0].status;
    this.editExpiresIn = this.makeValidDate(ell[0].expiresIn)
  }

  makeValidDate(date: string){
    console.log(date)
    if (date != '-' && date != null && date != undefined && date != '')
      return (date.slice(6, 10) + '-' + date.slice(3,5) + '-' + date.slice(0,2));
    else 
      return '';
  }

  cancelEdit(){
    this.editKeyId = '';
    this.editStatus = '';
    this.editExpiresIn = '';
  }

  async confirmEdit(){
    console.log('редактирован', this.editExpiresIn);
    document.getElementById('editExpiresIn').classList.remove('invalid');
    if (this.editStatus == 'lifetime'){
      this.editExpiresIn = '';
      await this.editKey()
    }else{
      if (this.editExpiresIn == '' || this.editExpiresIn == null || this.editExpiresIn == undefined){
        document.getElementById('editExpiresIn').classList.add('invalid');
      }
      else{
        await this.editKey()
      }
    }
  }

  async editKey(){
    this.spinner.show();
    let body = {id: this.editKeyId, status: this.editStatus, expiresIn: this.editExpiresIn};
    await this.http.editKey(body)
    .then(async () => {
      this.cancelEdit();
      await this.getKeys()
    })
    .catch(e =>{
      if (e.status == 401)
        this.auth.logout();
    })
  }


}
