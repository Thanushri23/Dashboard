import { Component } from '@angular/core';
import { AdminSidebar } from './sidebar/sidebar';
import { AdminNavbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AdminSidebar, AdminNavbar, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
