import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeavesService } from '../../../services/leaves';

@Component({
  selector: 'app-leaves',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class Leaves implements OnInit {
  leaves: any[] = [];
  
  newLeave = {
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(private leaveService: LeavesService) {}

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getLeaves().subscribe((res: any) => {
      this.leaves = res;
    });
  }

  applyLeave() {
    if (!this.newLeave.startDate || !this.newLeave.endDate || !this.newLeave.reason) return;
    this.leaveService.applyLeave(this.newLeave).subscribe(() => {
      this.newLeave = { startDate: '', endDate: '', reason: '' };
      this.loadLeaves();
    });
  }
}
