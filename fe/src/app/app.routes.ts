import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { Employee } from './pages/employee-dash/employee/employee';
import { Tasks } from './pages/employee-dash/tasks/tasks';
import { Leaves } from './pages/employee-dash/leaves/leaves';
import { Profile } from './pages/employee-dash/profile/profile';
import { Setting } from './pages/employee-dash/setting/setting';
import { EmployeeHome } from './pages/employee-dash/home/home';

import { AdminTasks } from './pages/admin/tasks/tasks';
import { AdminLeaves } from './pages/admin/leaves/leaves';
import { AdminProfile } from './pages/admin/profile/profile';
import { AdminSetting } from './pages/admin/setting/setting';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manager', component: Admin, children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: AdminTasks },
      { path: 'leaves', component: AdminLeaves },
      { path: 'profile', component: AdminProfile },
      { path: 'settings', component: AdminSetting }
  ] },
  { path: 'employee', component: Employee, children:[
      { path: '', component: EmployeeHome },
      { path: 'tasks', component: Tasks },
      { path: 'leaves', component: Leaves },
      { path: 'profile', component: Profile },
      { path: 'settings', component: Setting }
  ] }
];