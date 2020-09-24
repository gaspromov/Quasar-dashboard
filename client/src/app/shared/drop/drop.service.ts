import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DropService {
  headers: HttpHeaders;
  url = "/api/v1";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.headers = new HttpHeaders();
  }

  async postPaymentToken(paymentToken: string, email: string, dropId: string, key: string){
    return await this.http.post(`${this.url}/payment`, { paymentToken: paymentToken, dropId: dropId, key: key, email: email }).toPromise();
  }

  async getWidgetToken(){
    return await this.http.post(`${this.url}/payment`, {}).toPromise();
  }
}