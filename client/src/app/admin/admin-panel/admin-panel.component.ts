import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnDestroy{
  password: string = "";
  error: string;
  message: string;
  viewChanging: boolean = false;
  changing: boolean = false;
  subscribtion;
  constructor(private router: Router){
    this.subscribtion = this.router.events.subscribe((event: any = {}) => 
      {
        if (event.url == '/admin-panel/home' || event.url == '/admin-panel')
          this.changing = true;
        else
          this.changing = false;
      });
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  changingPassword(viewing){
    this.viewChanging = viewing;
  }

  onCloseChanging(close: boolean){
    this.viewChanging = close;
  }
  
}
