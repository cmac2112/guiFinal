import { Injectable } from '@angular/core';

// this is the service that will provide logged in state to our components
// if a user is not logged in or registered,they cannot access anything past the landing page
@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  constructor() { }
  private users = [];
  protected isLoggedIn = false;

  private url = "https://gui230.jitdesigns.com/api/User"

  async getUsers(){
    try{
      const response = await fetch(this.url);
      const data = await response.json();
      console.log(data);
      this.users = data;
      console.log(this.users);
    }catch(error){
      console.log(error);

    }
  }


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
