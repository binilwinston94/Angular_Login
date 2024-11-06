import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  signupusers: any[] = [];

  loginobj: any = {
    UserName: "",
    Password: ""
  }
  constructor(private authService: AuthService, private route: Router) { }

  onLogin() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).pipe(
        catchError(error => {
          console.error('Login failed', error);
          return of(null); // Return a fallback value or an observable
        })
      ).subscribe(
        (response) => {
          if (response) {
            console.log('Login successful', response);
            //this.router.navigate(['/greeting']); // Adjust the path as necessary
          } else {
            alert('Login failed, please try again');
          }
        }
      );
    } else {
      alert('Please enter both username and password');
    }
  }
  onChecking() {

    // this.signupusers.push(this.loginobj);
    // localStorage.setItem('loginUsers',JSON.stringify(this.signupusers));
    // this.loginobj = {
    //   UserName :"",
    //   Password: ""
    // }
    //debugger
    this.authService.onlogin(this.loginobj).subscribe((res: any) => {
          if(res.statusCode ==404)
          {
            console.log('response',res);
             alert('User Invalid');
             this.route.navigate(['/login']);
             this.loginobj = {
               UserName :"",
                Password: ""
              }
          }
          else{
            console.log('response',res);
            localStorage.setItem('token',res.token);
            this.route.navigate(['/dashboard']);
          }
                  
    })
  }

}




