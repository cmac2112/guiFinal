import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from '../logged-in.service'; //import the service so this component can access it

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit{
  //define the service
  loggedInService: LoggedInService = inject(LoggedInService);
  isLoggedIn: boolean = false;
  test: string = '';

  word: string = 'hello';
  //test the service
  constructor() {
    this.isLoggedIn = this.loggedInService.getLoggedIn();
    this.fetchUsers();
    //this.test = this.loggedInService.anotherTestFunction(this.word);
    console.log('test function output: ' + this.test);

    console.log('Logged in: ' + this.isLoggedIn);
  }

  async fetchUsers() {
    try {
      const users = await this.loggedInService.getUsers();
      console.log(users);
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  }
  ngOnInit(): void {
    
  }
  
}
