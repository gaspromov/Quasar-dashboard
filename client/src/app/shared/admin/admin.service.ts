import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = "/api/v1/admin"
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
   }

  async newKey(data: any = {}){
    this.setHeader()
    return await this.http.post(`${this.url}/license`, data, {headers: this.headers}).toPromise()
  }
  
  setHeader(){
    let token = localStorage.getItem('accessToken')
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }
}
