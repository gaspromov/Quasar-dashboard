import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = "/api/v1"
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
   }

  async newKey(data: any = {}){
    this.setHeader()
    return await this.http.post(`${this.url}/licenses`, data, {headers: this.headers}).toPromise()
  }

  async postSuccess(formData){
    this.setHeader();
    return await this.http.post(`${this.url}/successes`, formData, {headers: this.headers}).toPromise()
  }
  
  setHeader(){
    let token = localStorage.getItem('accessToken')
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }
}
