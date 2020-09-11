import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = '/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  
  async getUserData(){
    return await this.http.get(`${this.url}/users/@me`).toPromise();
  }

  async bind(key: string){
    return await this.http.post(`${this.url}/users/license`, {key: key}).toPromise();
  }
  
  async getSuccesses(){
    return await this.http.get(`${this.url}/successes`).toPromise();
  }

  async unbind(){
    return await this.http.delete(`${this.url}/users/license`).toPromise();
  }
}
