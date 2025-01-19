import { Routes } from '@angular/router';
import { UserListComponent } from "../features/components/user-list/user-list.component";

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
];
