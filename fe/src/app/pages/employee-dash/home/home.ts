import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../services/tasks';
import { LeavesService } from '../../../services/leaves';

@Component({
  selector: 'app-employee-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class EmployeeHome implements OnInit {
  tasks: any[] = [];
  leaves: any[] = [];

  editingTaskId: string | null = null;
  editTaskData = {
    title: '',
    description: ''
  };

  get activeTasksCount() {
    return this.tasks.filter(t => t.status === 'pending' || !t.status).length;
  }

  constructor(
    private taskService: TasksService,
    private leaveService: LeavesService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.taskService.getTasks().subscribe((res: any) => this.tasks = res);
    this.leaveService.getLeaves().subscribe((res: any) => this.leaves = res);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadData();
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
      this.loadData();
    });
  }
}
