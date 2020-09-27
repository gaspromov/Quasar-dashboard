import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  password: string = "";
  error: string;
  message: string;
  viewChanging: boolean = false;

  changingPassword(viewing){
    this.viewChanging = viewing;
  }
  
}
