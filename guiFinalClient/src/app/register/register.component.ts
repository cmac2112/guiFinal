import { Component } from '@angular/core';
import { LoggedInService } from '../logged-in.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private loggedInService: LoggedInService) {
    this.loggedInService.userRegister(this.firstName, this.lastName, this.email, this.username, this.password);
   }
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  

  ngOnInit(): void {
  }
  onSubmit() {
    this.loggedInService.userRegister(this.firstName, this.lastName, this.email, this.username, this.password);
    console.log(this.loggedInService.getLoggedIn());
  }
}
