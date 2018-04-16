import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {
    messages = []
    path = 'http://localhost:3000/auth'

    constructor( private http: Http) {}

    registerUser(registerData) {
        this.http.post(this.path + '/register', registerData).subscribe(res => {
        })
    }    
    loginUser(loginData) {
        this.http.post(this.path + '/login', loginData).subscribe(res => {
            console.log(res)
            localStorage.setItem('token', res.json().token)
        })
    }

}