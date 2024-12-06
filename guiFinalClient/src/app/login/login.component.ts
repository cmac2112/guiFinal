import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInService } from '../logged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loggedInService: LoggedInService, private router: Router) {
    this.loggedInService.userLogin(this.username, this.password);
   }
  username = '';
  password = '';
  error = '';
  login() {
    this.loggedInService.userLogin(this.username, this.password);
    console.log(this.loggedInService.getLoggedIn());
    if(this.loggedInService.isLoggedIn){
      console.log('logged in')
      console.log('user is logged in and login function is finished')
      this.router.navigate(['/dashboard']);
  }else{
    console.log('error')
    this.error = 'Invalid username or password'
    setTimeout(()=>{this.error = ''}, 3000)
  }
  }
}
