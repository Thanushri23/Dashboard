import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER
  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  // ✅ LOGIN
  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }

  // ✅ SAVE TOKEN
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ GET TOKEN
  getToken() {
    return localStorage.getItem('token');
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('token');
  }

  // ✅ CHECK LOGIN
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}