import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar>
      PSSocial
      <button md-button routerLink="/users">Users</button>
      <span style="flex: 1 1 auto"></span>
      <button md-button routerLink="/register">Register</button>
    </md-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'my app';
}
