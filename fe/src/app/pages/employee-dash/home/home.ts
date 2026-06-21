import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from '../services/tasks';
import { LeavesService } from '../../../services/leaves';

@Component({
  selector: 'app-employee-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class EmployeeHome implements OnInit {
  tasks: any[] = [];
  leaves: any[] = [];

  constructor(
    private taskService: TasksService,
    private leaveService: LeavesService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((res: any) => this.tasks = res);
    this.leaveService.getLeaves().subscribe((res: any) => this.leaves = res);
  }
}
