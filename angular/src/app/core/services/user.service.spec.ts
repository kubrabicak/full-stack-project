import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from "../models/user.model";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, fullName: 'John Doe', displayName: 'John', email: 'john@example.com', details: 'Some user details' },
    { id: 2, fullName: 'Jane Doe', displayName: 'Jane', email: 'jane@example.com', details: 'Some user details' }
  ];

  const mockUser: User = { id: 1, fullName: 'John Doe', displayName: 'John', email: 'john@example.com', details: 'Some user details' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    service.fetchUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Users fetched successfully.', data: mockUsers }); // Mock the new response structure
  });

  it('should add a user', () => {
    service.addUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ message: 'User added successfully.', data: mockUser }); // Mock the new response structure
  });

  it('should update a user', () => {
    service.updateUser(mockUser).subscribe(() => {
      expect(true).toBeTrue(); // Test passes if update succeeds
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ message: 'User updated successfully.', data: null }); // Mock the new response structure
  });

  it('should delete a user', () => {
    service.deleteUser(mockUser.id!).subscribe(() => {
      expect(true).toBeTrue(); // Test passes if delete succeeds
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'User deleted successfully.', data: null }); // Mock the new response structure
  });

  it('should handle fetchUsers error', () => {
    service.fetchUsers().subscribe({
      next: () => fail('expected an error, not users'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush('Error fetching users', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle addUser error', () => {
    service.addUser(mockUser).subscribe({
      next: () => fail('expected an error, not a user'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush('Error adding user', { status: 400, statusText: 'Bad Request' });
  });

  it('should handle updateUser error', () => {
    service.updateUser(mockUser).subscribe({
      next: () => fail('expected an error, not a successful update'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush('Error updating user', { status: 404, statusText: 'Not Found' });
  });

  it('should handle deleteUser error', () => {
    service.deleteUser(mockUser.id!).subscribe({
      next: () => fail('expected an error, not a successful delete'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Error deleting user', { status: 404, statusText: 'Not Found' });
  });
});
