import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../employee-dash/services/tasks';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-admin-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class AdminTasks implements OnInit {
  tasks: any[] = [];
  users: any[] = [];

  newTask = {
    title: '',
    description: '',
    userId: ''
  };

  editingTaskId: string | null = null;
  editTaskData = {
    title: '',
    description: ''
  };

  isSubmitting = false;

  constructor(
    private taskService: TasksService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.taskService.getTasks().subscribe((res: any) => this.tasks = res);
    this.userService.getUsers().subscribe((res: any) => this.users = res);
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.userId || this.isSubmitting) return;
    this.isSubmitting = true;
    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.newTask = { title: '', description: '', userId: '' };
        this.loadData();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error("Error adding task", err);
        this.isSubmitting = false;
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadData());
  }

  startEdit(task: any) {
    this.editingTaskId = task._id;
    this.editTaskData = { title: task.title, description: task.description };
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  saveEdit(id: string) {
    this.taskService.updateTask(id, this.editTaskData).subscribe(() => {
      this.editingTaskId = null;
      this.loadData();
    });
  }
}
