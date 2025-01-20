import { User } from "../models/user.model";

export function sortUsersById(users: User[], sortDirection: 'asc' | 'desc'): User[] {
  return [...users].sort((a, b) => {
    const idA = a.id ?? 0; // Fallback to 0 if id is undefined
    const idB = b.id ?? 0;

    const comparison = idA - idB; // Numerical comparison
    return sortDirection === 'asc' ? comparison : -comparison;
  });
}

