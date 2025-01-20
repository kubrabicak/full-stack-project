import { UserTableComponent } from '../features/components/user-table/user-table.component';
import { routes } from "./app.routes";

describe('App Routing', () => {

  it('should have a route for empty path that redirects to /users', () => {
    const emptyRoute = routes.find(route => route.path === '');
    expect(emptyRoute).toBeTruthy();
    expect(emptyRoute?.redirectTo).toBe('/users');
    expect(emptyRoute?.pathMatch).toBe('full');
  });

  it('should have a route for /users that loads UserTableComponent', () => {
    const usersRoute = routes.find(route => route.path === 'users');
    expect(usersRoute).toBeTruthy();
    expect(usersRoute?.component).toBe(UserTableComponent);
  });
});
