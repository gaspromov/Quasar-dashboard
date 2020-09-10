import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KeysService {
  url = '/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  async bind(key: string){
    return await this.http.post(`${this.url}/access/license`, {key: key}).toPromise()
  }
}
