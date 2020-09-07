import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;
  url = "";

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  }

  async getUrl() {
    return await this.http.get(`${this.url}/login/discord`, {headers: this.headers}).toPromise();
  }

  async getUserData(code: string){
    return await this.http.post(`${this.url}/api/v1/auth/discord/login?code=${code}`, {headers: this.headers}).toPromise();
  }

}
