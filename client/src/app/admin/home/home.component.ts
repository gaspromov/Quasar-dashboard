import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modal = 0;


  constructor(
    private http: AdminService,
    
  ) { }

  ngOnInit() {
  }

  showModal(modal: number){
    this.modal = modal;
    document.querySelectorAll('#filter')[0].classList.add('blur')
    document.querySelectorAll('#filter')[1].classList.add('blur')
  }

  hideModal(){
    this.modal = 0;
    document.querySelectorAll('#filter')[0].classList.remove('blur')
    document.querySelectorAll('#filter')[1].classList.remove('blur')
  }

}
