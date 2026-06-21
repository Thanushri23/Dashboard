import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class AdminProfile implements OnInit {
  user: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getMe().subscribe((res: any) => {
      this.user = res;
    });
  }
}
