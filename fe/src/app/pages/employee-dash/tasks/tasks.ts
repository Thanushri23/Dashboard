import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks: any[] = [];

  newTask = {
    title: '',
    description: ''
  };

  editingTaskId: string | null = null;
  editTaskData = {
    title: '',
    description: ''
  };

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }

  addTask() {
    if (!this.newTask.title) return;
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '' };
      this.loadTasks();
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
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
      this.loadTasks();
    });
  }
}
