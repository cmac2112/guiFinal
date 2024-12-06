import { Injectable } from '@angular/core';

// this is the service that will provide logged in state to our components
// if a user is not logged in or registered,they cannot access anything past the landing page
interface User{
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  constructor() { }
  private users: User[] = [];
  public isLoggedIn = false;
  public currentUser: User = {} as User;

  private url = "https://gui230.jitdesigns.com/api/User"

  async getUsers(){
    try{
      const response = await fetch(this.url);
      const data = await response.json();
      console.log(data);
      this.users = JSON.parse(data);
      console.log(this.users);
    }catch(error){
      console.log(error);

    }
  }
  //check if user is in the 'database'

  async userLogin(username: string, password: string){
    console.log('logging in')
    this.getUsers()
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].username == username && this.users[i].password == password){
        this.isLoggedIn = true;
        console.log('logged in')
        console.log('this.logged in = ' + this.isLoggedIn)
        return;
      }else{
        console.log('not logged in')
        this.isLoggedIn = false;
      }
    }
  }
  async userRegister(firstname: string, lasname: string, email: string, username: string, password: string){
    console.log('registering')
    this.getUsers()
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].username == username){
        console.log('username already exists')
        return;
      }
    }
    let newUser = {
      username: username,
      password: password,
      email: email,
      first_name: firstname,
      last_name: lasname,
      role: 'user',
    }
    this.users.push(newUser)
    console.log('user registered')
    console.log(this.users)
  }
  userLogout(){
    this.isLoggedIn = false;
  }
  getLoggedIn(){
    console.log('getloggedin ran')
    return this.isLoggedIn;
  }
}
