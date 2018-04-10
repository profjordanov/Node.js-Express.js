import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar>
      PSSocial
      <span style="flex: 1 1 auto"></span>
      <button md-button routerLink="/register">Register</button>
    </md-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my app';
}
