import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>User Management System</h1>
    <router-outlet></router-outlet>  <!-- This will render routed components -->
  `,
  styles: [`
    h1 {
      text-align: center;
      font-size: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'user-management-frontend';
}
