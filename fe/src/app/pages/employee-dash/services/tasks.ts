import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
   api = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') || ''
      })
    };
  }

  // ✅ Get logged-in user's tasks
  getTasks() {
    return this.http.get(this.api, this.getHeaders());
  }

  // ✅ Add task
  addTask(data: any) {
    return this.http.post(this.api, data, this.getHeaders());
  }
  // ✅ DELETE TASK
deleteTask(id: string) {
  return this.http.delete(`${this.api}/${id}`, this.getHeaders());
}

// ✅ UPDATE TASK
updateTask(id: string, data: any) {
  return this.http.put(`${this.api}/${id}`, data, this.getHeaders());
}
}