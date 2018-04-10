import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MdButtonModule, MdCardModule, MdToolbarModule, MdInputModule} from '@angular/material'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ApiService } from './api.service'
import { AuthService } from './auth.service'
import { MessagesComponent } from './messages.component'
import { RegisterComponent } from './register.component'
import { LoginComponent } from './login.component'
import { UsersComponent } from './users.component'


const routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile/:id', component: UsersComponent }
]

@NgModule({
  declarations: [
    AppComponent, MessagesComponent, RegisterComponent, LoginComponent, UsersComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    FormsModule,
    MdButtonModule, 
    MdCardModule, 
    MdToolbarModule, 
    RouterModule.forRoot(routes), 
    MdInputModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
