import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAuthService } from 'src/app/shared/admin-auth/admin-auth.service';
import { AdminService } from 'src/app/shared/admin/admin.service';
import { SearchPaymentsPipe } from 'src/app/shared/pipes/payments/search-payments.pipe';
import { FilterPaymentsPipe } from 'src/app/shared/pipes/payments/filter-payments.pipe';

@Component({
  selector: 'app-last-payments',
  templateUrl: './last-payments.component.html',
  styleUrls: ['./last-payments.component.css']
})
export class LastPaymentsComponent implements OnInit {
  payments: any = [];
  filtPayments: any = [];
  outputPayments: any = [];
  canceled: boolean = false;
  successed: boolean = false;
  searchParam: string = '';

  searching = new SearchPaymentsPipe();
  filter = new FilterPaymentsPipe();

  constructor(
    private spinner: NgxSpinnerService,
    private http: AdminService,
    private auth: AdminAuthService,
    private cdr: ChangeDetectorRef
    ) { }

  async ngOnInit() {
    await this.getPayments();
  }

  async getPayments(){
    this.spinner.show();
    await this.http.getLastPayments()
    .then( (w: any) =>{
      this.payments = w.items;
      
      for (let i = 0; i < this.payments.length; i++){
        let date = new Date(this.payments[i].created_at);

        this.payments[i].date1 = this.makeValidDate(date.getDate()) + '.' + 
                                      this.makeValidDate((date.getMonth()+1)) + '.' + 
                                      this.makeValidDate(date.getFullYear());

        this.payments[i].time = this.makeValidDate(date.getHours()) + ':' + 
                                      this.makeValidDate(date.getMinutes()) + ':' + 
                                      this.makeValidDate(date.getSeconds());
        this.onChange();
      }
      this.spinner.hide();
    })
    .catch(e =>{
      if (e.status == 401)
        this.auth.logout();
      else  
        console.log(e);
    })
  }

  makeValidDate(date){
    return date < 10 ? `0${date}` : date
  }

  changeOutputPayments(payments: any){
    this.outputPayments = payments;
    this.cdr.detectChanges();
  }

  onChange(){
    
    this.filtPayments = this.searching.transform(this.payments, this.searchParam);
    this.filtPayments = this.filter.transform(this.payments, this.canceled, this.successed);
  }
}
