import {Component, computed, OnInit, signal, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from "../../../core/services/user.service";
import { UserAddComponent } from "../user-add/user-add.component";
import { UserUpdateComponent } from "../user-update/user-update.component";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { TitleCasePipe } from "../../../core/shared/pipe/title-case.pipe";
import { MatTooltip } from "@angular/material/tooltip";
import { UserFilterPipe } from "../../../core/shared/pipe/user-filter.pipe";
import { HighlightRowDirective } from "../../../core/shared/directive/highlight-row.directive";
import { User } from "../../../core/models/user.model";
import { sortUsersById } from "../../../core/utils/sort-users.util";
import { HIGHLIGHT_TIMEOUT, USER_TABLE_COLUMNS } from "../../../constants/user.constants";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, TitleCasePipe, MatTooltip, UserFilterPipe, HighlightRowDirective],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  // Signals for managing the user list and current total count
  usersSignal = signal<User[]>([]);
  searchTerm: string = '';  // The search term that will be used to filter users
  displayedColumns = USER_TABLE_COLUMNS;

  // Store IDs of added and updated users
  addedUsers: Set<number> = new Set();
  updatedUsers: Set<number> = new Set();

  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction

  constructor(
    private userService: UserService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.fetchUsers().subscribe({
      next: (users) => this.usersSignal.set(users),
      error: (err) => console.error('Failed to fetch users:', err),
    });
  }

  sortById(): void {
    const sortedUsers = sortUsersById(this.usersSignal(), this.sortDirection);
    this.usersSignal.set(sortedUsers); // Update the signal with sorted users
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle sort direction
  }

  filteredUsers(): User[] {
    const term = this.searchTerm.toLowerCase();
    return this.usersSignal().filter(
      (user) =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  openUserDetails(user: User): void {
    this.dialog.open(UserDetailsComponent, { data: user });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  addUser(newUser: User): void {
    this.userService.addUser(newUser).subscribe({
      next: (addedUser) => {
        this.usersSignal.set([...this.usersSignal(), addedUser]);
        this.addedUsers.add(addedUser.id!); // Mark this user as added
        setTimeout(() => this.addedUsers.delete(addedUser.id!), HIGHLIGHT_TIMEOUT); // Remove highlight after 5 seconds
      },
      error: (err) => console.error('Error adding user:', err),
    });
  }

  updateUser(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, { data: user });
    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        this.userService.updateUser(updatedUser).subscribe({
          next: () => {
            this.usersSignal.set(
              this.usersSignal().map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            this.updatedUsers.add(updatedUser.id); // Mark this user as updated
            setTimeout(() => this.updatedUsers.delete(updatedUser.id), HIGHLIGHT_TIMEOUT); // Remove highlight after 5 seconds
          },
          error: (err) => console.error('Error updating user:', err),
        });
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Error deleting user:', err),
    });
  }
}
