import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  api = 'http://localhost:3000/api/leaves';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || ''
      })
    };
  }

  getLeaves() {
    return this.http.get(this.api, this.getHeaders());
  }

  applyLeave(data: any) {
    return this.http.post(this.api, data, this.getHeaders());
  }

  updateLeaveStatus(id: string, status: string) {
    return this.http.put(`${this.api}/${id}`, { status }, this.getHeaders());
  }
}
