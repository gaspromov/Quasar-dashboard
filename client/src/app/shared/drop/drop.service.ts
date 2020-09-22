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

  async postPaymentToken(paymentToken: string){
    return await this.http.post(`${this.url}/payment`, { paymentToken: paymentToken }).toPromise();
  }
}
