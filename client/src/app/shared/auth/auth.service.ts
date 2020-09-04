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
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  async auth() {
    await this.http.get(`${this.url}/login/discord`, {headers: this.headers}).toPromise();
  }

}
