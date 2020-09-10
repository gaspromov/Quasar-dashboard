import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-activate-key',
  templateUrl: './activate-key.component.html',
  styleUrls: ['./activate-key.component.css']
})
export class ActivateKeyComponent implements OnInit {

  constructor(
  ) { }

  async ngOnInit() {
  }

  click(){
    console.log('www')
  }

}
