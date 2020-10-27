import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from './shared/seo/Seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'quasar';
  subscribtion;
  url: string = '';

  constructor(
    private router: Router,
    private seo: SeoService
  ){
    this.subscribtion = this.router.events.subscribe((event: any = {}) => 
      {
        if (event.url && this.url != event.url){
          this.url = event.url;
          this.seo.changeUrl(this.url);
          if (this.url == '/user_agreement')
            this.seo.changeIndex('noindex')
          else
            this.seo.changeIndex('all');
        }
      });
  }

  ngOnDestroy(){
    this.subscribtion.unsubscrive();
  }
}
