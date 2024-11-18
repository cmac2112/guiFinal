import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from '../logged-in.service'; //import the service so this component can access it

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
/*
interface data {
  id: number;
  name: string;
  date: string;
  location: string;
}
  */
export class LandingComponent implements OnInit{
  //define the service
  loggedInService: LoggedInService = inject(LoggedInService);
  isLoggedIn: boolean = false;
  test: string = '';

  word: string = 'hello';
  //test the service
  constructor() {
    this.isLoggedIn = this.loggedInService.getLoggedIn();
    //this.test = this.loggedInService.anotherTestFunction(this.word);
    console.log('test function output: ' + this.test);

    console.log('Logged in: ' + this.isLoggedIn);
    console.log('Logged in: ' + this.isLoggedIn);
    console.log('Logged in: ' + this.isLoggedIn);
    console.log('Logged in: ' + this.isLoggedIn);
  }
  async getData () {
    try {
      const response = await fetch('https://gui230.jitdesigns.com/api/User');
      const data = await response.json();
      console.log(JSON.parse(data));
    } catch (error: any) { //cors issues
      console.error(error);
    }
  }
  ngOnInit(): void {
    this.getData(); 
  }
  
}
