import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  api = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || ''
      })
    };
  }

  getUsers() {
    return this.http.get(this.api, this.getHeaders());
  }

  getMe() {
    return this.http.get(`${this.api}/me`, this.getHeaders());
  }

  addUser(data: any) {
    return this.http.post(this.api, data, this.getHeaders());
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.api}/${id}`, this.getHeaders());
  }
  
}