import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

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

  async postSuccess(formData){
    this.setHeader();
    return await this.http.post(`${this.url}/successes`, formData, {headers: this.headers}).toPromise();
  }
  
  async newKey(data: any = {}){
    this.setHeader();
    return await this.http.post(`${this.url}/licenses`, data, {headers: this.headers}).toPromise();
  }

  async getKeys(){
    this.setHeader();
    return await this.http.get(`${this.url}/licenses`, {headers: this.headers}).toPromise();
  }

  async deleteKey(id){
    this.setHeader();
    let opt = {headers: this.headers, body: {id:id}}
    return await this.http.delete(`${this.url}/licenses`, opt).toPromise();
  }

  async editKey(data){
    this.setHeader();
    return await this.http.patch(`${this.url}/licenses`, data, {headers: this.headers}).toPromise();
  }

  async newDrop(data){
    this.setHeader();
    return await this.http.post(`${this.url}/drops`, data, {headers: this.headers}).toPromise();
  }

  
  async getDrops(){
    this.setHeader()
    return await this.http.get(`${this.url}/drops`, {headers: this.headers}).toPromise();
  }

  async getNotifications(){
    this.setHeader()
    return await this.http.get(`${this.url}/notifications`, {headers: this.headers}).toPromise();
  }
  
  async deleteNotifications(id){
    this.setHeader();
    let opt = {headers: this.headers, body: {id: id}};
    return await this.http.delete(`${this.url}/notifications`, opt).toPromise();
  }

  setHeader(){
    let token = localStorage.getItem('accessToken')
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  }
}
