import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  headers: HttpHeaders;
  url = "/api/v1/auth";

  constructor(
    private http: HttpClient,
  ) { 
    this.headers = new HttpHeaders();
  }


  async login(body: {}){
    return await this.http.post(`${this.url}/login`, body, {headers: this.headers}).toPromise();
  }

  async changePassword(password: string){
    this.setHeader();
    return await this.http.post(`${this.url}/password`, password, { headers: this.headers }).toPromise()
  }

  setHeader(){
    let token = localStorage.getItem('accessToken')
    this.headers = this.headers.append('Authorization', `Bearer ${token}`)
  }

}
