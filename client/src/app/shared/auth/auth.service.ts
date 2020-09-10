import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;
  url = "/api/v1";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.headers = new HttpHeaders();
  }

  async getUserData(){
    return await this.http.get(`${this.url}/users`, {headers: this.headers}).toPromise();
  }

  async logout(){
    return await this.http.get(`${this.url}/auth/discord/logout`, {headers: this.headers}).toPromise();
  }

  logoutCookie(){
    document.cookie = "discord.oauth2=''; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    localStorage.removeItem('member');
    this.router.navigate(['/login']);
  }

}
