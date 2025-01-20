import { User } from '../models/user.model';
import { sortUsersById } from "./sort-users.util";

describe('sortUsersById', () => {
  it('should sort users by id in ascending order', () => {
    const users: User[] = [
      {
        id: 3, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 1, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      }
    ];

    const sortedUsers = sortUsersById(users, 'asc');

    expect(sortedUsers).toEqual([
      {
        id: 1, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 3, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      }
    ]);
  });

  it('should sort users by id in descending order', () => {
    const users: User[] = [
      {
        id: 3, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 1, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      }
    ];

    const sortedUsers = sortUsersById(users, 'desc');

    expect(sortedUsers).toEqual([
      {
        id: 3, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 1, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      }
    ]);
  });

  it('should handle users with undefined id by treating them as 0', () => {
    const users: User[] = [
      {
        id: 3, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: undefined, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 1, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      }
    ];

    const sortedUsers = sortUsersById(users, 'asc');

    expect(sortedUsers).toEqual([
      {
        id: undefined, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 1, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 3, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      }
    ]);
  });

  it('should return an empty array if no users are provided', () => {
    const users: User[] = [];

    const sortedUsers = sortUsersById(users, 'asc');

    expect(sortedUsers).toEqual([]);
  });

  it('should handle users with the same id', () => {
    const users: User[] = [
      {
        id: 2, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      }
    ];

    const sortedUsers = sortUsersById(users, 'asc');

    expect(sortedUsers).toEqual([
      {
        id: 2, fullName: 'Alice',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Bob',
        displayName: '',
        email: '',
        details: ''
      },
      {
        id: 2, fullName: 'Charlie',
        displayName: '',
        email: '',
        details: ''
      }
    ]);
  });
});
