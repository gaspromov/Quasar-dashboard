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

  async getUserData(){
    return await this.http.get(`${this.url}/api/v1/access/licence`, {headers: this.headers}).toPromise();
  }

}
