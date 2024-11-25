import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor() { }
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('test submit')
  }
}
