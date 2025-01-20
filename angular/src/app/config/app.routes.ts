import { Routes } from '@angular/router';
import { UserTableComponent } from "../features/components/user-table/user-table.component";

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserTableComponent },
];
