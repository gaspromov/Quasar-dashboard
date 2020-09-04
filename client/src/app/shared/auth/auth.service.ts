import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;
  url = "http://localhost:3001";

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  }

  async auth() {
    
    fetch('http://localhost:3001/login/discord', {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    }
    }).then(result => result.json())
    .then(console.log);
    
    // await this.http.get(`${this.url}/login/discord`, {headers: this.headers}).toPromise();
  }

}
