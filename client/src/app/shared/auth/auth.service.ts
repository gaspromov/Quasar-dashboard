import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;
  url = "/api/v1";

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
  }

  async getUserData(){
    return await this.http.get(`${this.url}/users`, {headers: this.headers}).toPromise();
  }

  async logout(){
    return await this.http.get(`${this.url}/auth/discord/logout`, {headers: this.headers}).toPromise();
  }

}
