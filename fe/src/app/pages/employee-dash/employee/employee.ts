import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [Sidebar, Navbar, RouterOutlet],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {

}
