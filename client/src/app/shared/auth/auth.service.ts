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
    return await this.http.get(`${this.url}/access/licence`, {headers: this.headers}).toPromise();
  }

}
