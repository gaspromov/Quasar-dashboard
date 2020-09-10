import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  headers: HttpHeaders;
  url = "/api/v1/auth";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 
    this.headers = new HttpHeaders();
  }


  async login(body: {}){
    return await this.http.post(`${this.url}/login`, body, {headers: this.headers}).toPromise();
  }

  async changePassword(password: string){
    this.setHeader();
    return await this.http.post(`${this.url}/password`, {password: password}, { headers: this.headers }).toPromise()
  }

  logout(){
    localStorage.removeItem('acessToken');
    localStorage.removeItem('userType');
    this.router.navigate(['/admin']);
  }

  setHeader(){
    let token = localStorage.getItem('accessToken')
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }

}
