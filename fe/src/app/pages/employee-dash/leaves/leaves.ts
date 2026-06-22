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

  isSubmitting = false;

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
    if (!this.newLeave.startDate || !this.newLeave.endDate || !this.newLeave.reason || this.isSubmitting) return;
    this.isSubmitting = true;
    this.leaveService.applyLeave(this.newLeave).subscribe({
      next: () => {
        this.newLeave = { startDate: '', endDate: '', reason: '' };
        this.loadLeaves();
        this.isSubmitting = false;
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
