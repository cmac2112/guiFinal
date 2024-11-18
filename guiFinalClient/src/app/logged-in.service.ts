import { Injectable } from '@angular/core';

// this is the service that will provide logged in state to our components
// if a user is not logged in or registered,they cannot access anything past the landing page
@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  constructor() { }

  protected isLoggedIn = false;


  userLogin(username: string, password: string){

  }
  userLogout(){
    this.isLoggedIn = false;
  }
  getLoggedIn(){
    console.log('getloggedin ran')
    return this.isLoggedIn;
  }
}
