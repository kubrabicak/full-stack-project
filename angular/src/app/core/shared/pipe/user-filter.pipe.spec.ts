import { UserFilterPipe } from './user-filter.pipe';
import { User } from '../../../features/components/user.model';

describe('UserFilterPipe', () => {
  let pipe: UserFilterPipe;

  beforeEach(() => {
    pipe = new UserFilterPipe();
  });

  const mockUsers: User[] = [
    { id: 1, fullName: 'John Doe', displayName: 'John', email: 'john@example.com', details: 'Some user details' },
    { id: 2, fullName: 'Jane Doe', displayName: 'Jane', email: 'jane@example.com', details: 'Some user details' },
    { id: 3, fullName: 'Alice Johnson', displayName: 'Alica', email: 'alice@example.com', details: 'Some user details' },
    { id: 4, fullName: 'Harry Potter', displayName: 'Harry', email: 'harry@example.com', details: 'Some user details' }

  ];

  it('should filter users by full name (case-insensitive)', () => {
    const result = pipe.transform(mockUsers, 'john');
    expect(result).toEqual([
      { id: 1, fullName: 'John Doe', displayName: 'John', email: 'john@example.com', details: 'Some user details' },
      { id: 3, fullName: 'Alice Johnson', displayName: 'Alica', email: 'alice@example.com', details: 'Some user details' },
    ]);
  });

  it('should filter users by email (case-insensitive)', () => {
    const result = pipe.transform(mockUsers, 'example.com');
    expect(result).toEqual(mockUsers); // All users have 'example.com' in their email
  });

  it('should handle an empty search term and return all users', () => {
    const result = pipe.transform(mockUsers, '');
    expect(result).toEqual(mockUsers); // No filter applied, all users returned
  });

  it('should return an empty array if no users match the search term', () => {
    const result = pipe.transform(mockUsers, 'notfound');
    expect(result).toEqual([]);
  });

  it('should handle an empty users array and return an empty array', () => {
    const result = pipe.transform([], 'john');
    expect(result).toEqual([]);
  });
});
