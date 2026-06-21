import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesService } from '../../../services/leaves';

@Component({
  selector: 'app-admin-leaves',
  imports: [CommonModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class AdminLeaves implements OnInit {
  leaves: any[] = [];

  constructor(private leaveService: LeavesService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.leaveService.getLeaves().subscribe((res: any) => this.leaves = res);
  }

  updateLeave(id: string, status: string) {
    this.leaveService.updateLeaveStatus(id, status).subscribe(() => this.loadData());
  }
}
