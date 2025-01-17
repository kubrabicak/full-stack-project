import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { UserDetailsComponent } from "../user-details/user-details.component";
import { UserService } from "../../../core/services/user.service";
import { UserFilterPipe } from "../../../core/shared/pipe/user-filter.pipe";
import { HighlightRowDirective } from "../../../core/shared/directive/highlight-row.directive";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let mockDialog: MatDialog;
  let deleteUserSpy: jasmine.Spy;

  // Mocked data for the test
  const mockUser = {
    id: 1,
    fullName: 'John Doe',
    displayName: 'John',
    email: 'john@example.com',
    details: 'Some user details',
  };

  // Mocking the UserService
  const mockUserService = {
    fetchUsers: jasmine.createSpy().and.returnValue(of([mockUser])),
    addUser: jasmine.createSpy(),
    updateUser: jasmine.createSpy(),
    deleteUser: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        TitleCasePipe,
        UserFilterPipe,
        HighlightRowDirective,
        MatDialogModule,
        BrowserAnimationsModule,
        UserListComponent,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        MatDialog,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    mockDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on ngOnInit', () => {
    component.ngOnInit();
    expect(mockUserService.fetchUsers).toHaveBeenCalled();
    expect(component.usersSignal().length).toBeGreaterThan(0);
  });

  it('should open user details dialog', () => {
    const user = mockUser;
    const openSpy = spyOn(mockDialog, 'open');
    component.openUserDetails(user);
    expect(openSpy).toHaveBeenCalledWith(UserDetailsComponent, { data: user });
  });

  it('should filter users by fullName or email', () => {
    component.usersSignal.set([
      { id: 1, fullName: 'John', displayName: 'john_doe', email: 'john@example.com', details: '' },
      { id: 2, fullName: 'Jane', displayName: 'jane_doe', email: 'jane@example.com', details: '' }
    ]);

    component.searchTerm = 'john';
    const filteredUsers = component.filteredUsers();

    expect(filteredUsers.length).toBe(1);  // Only 1 user should match the filter
    expect(filteredUsers[0].fullName).toBe('John');
  });

  it('should open add user dialog and add user', () => {
    const newUser = mockUser;
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(newUser)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);
    mockUserService.addUser.and.returnValue(of(newUser));

    component.openAddUserDialog();
    expect(mockUserService.addUser).toHaveBeenCalledWith(newUser);
  });

  it('should handle error when adding a user', () => {
    const newUser = { id: 2, fullName: 'Jane Doe', displayName: 'Jane', email: 'jane@example.com' };
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(newUser)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);

    mockUserService.addUser.and.returnValue(throwError(() => new Error('Error adding user')));
    spyOn(console, 'error');

    component.openAddUserDialog();
    expect(console.error).toHaveBeenCalledWith('Error adding user:', jasmine.any(Error));
  });

  it('should add user', () => {
    const newUser = mockUser;
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(newUser)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);
    mockUserService.addUser.and.returnValue(of(newUser));

    component.addUser(newUser);
    expect(mockUserService.addUser).toHaveBeenCalledWith(newUser);
  });

  it('should update user', () => {
    const updatedUser = mockUser;
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(updatedUser)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);
    mockUserService.updateUser.and.returnValue(of(updatedUser));

    component.updateUser(updatedUser);
    expect(mockUserService.updateUser).toHaveBeenCalledWith(updatedUser);
  });

  it('should handle error when updating a user', () => {
    const updatedUser = { id: 1, fullName: 'John Doe Updated', displayName: 'John Updated', email: 'john.com', details: 'Some user details' };
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(updatedUser)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);
    mockUserService.updateUser.and.returnValue(throwError(() => new Error('Error updating user')));

    spyOn(console, 'error');
    component.updateUser(updatedUser);
    expect(console.error).toHaveBeenCalledWith('Error updating user:', jasmine.any(Error));
  });

  it('should delete user', () => {
    const userIdToDelete = 1;
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(userIdToDelete)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);
    mockUserService.deleteUser.and.returnValue(of(userIdToDelete)); // Return the user ID on successful delete

    component.deleteUser(userIdToDelete); // Pass the ID to the method
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(userIdToDelete);
  });

  it('should handle error when delete a user', () => {
    const userIdToDelete = 1;
    const dialogRef = { afterClosed: jasmine.createSpy().and.returnValue(of(userIdToDelete)) };
    spyOn(mockDialog, 'open').and.returnValue(dialogRef as any);
    mockUserService.deleteUser.and.returnValue(throwError(() => new Error('Error deleting user')));

    spyOn(console, 'error');
    component.deleteUser(userIdToDelete);
    expect(console.error).toHaveBeenCalledWith('Error deleting user:', jasmine.any(Error));
  });
});
