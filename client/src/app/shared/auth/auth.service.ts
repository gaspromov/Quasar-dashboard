import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;
  url = 'http://localhost:3001';

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  async auth() {
    await this.http.get(`${this.url}`, {headers: this.headers}).toPromise();
  }

}
