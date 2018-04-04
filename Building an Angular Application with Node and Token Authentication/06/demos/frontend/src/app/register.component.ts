import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'register',
  template: `
      <md-card>
        <md-card-header>
            <md-card-title>
                <h4>Register New User</h4>
            </md-card-title>
        </md-card-header>
        <md-card-content>
            <form>
            <md-input-container>
                <input [(ngModel)]="registerData.email" name="email" mdInput placeholder="email" type="email">
            </md-input-container>
            <md-input-container>
                <input [(ngModel)]="registerData.pwd" name="password" mdInput placeholder="password" type="password">
            </md-input-container>
            <button (click)="post()" md-raised-button color="primary">Register</button>
            </form>
        </md-card-content>
      </md-card>
  `
})
export class RegisterComponent {
    registerData = {}

    constructor(private authService: AuthService) { }

    post() {
        console.log(this.registerData)
        this.authService.registerUser(this.registerData)
    }
}
