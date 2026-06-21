import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
time = new Date().toLocaleTimeString();

ngOnInit() {
  setInterval(() => {
    this.time = new Date().toLocaleTimeString();
  }, 1000);
}
}
