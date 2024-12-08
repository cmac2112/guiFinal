import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface User{
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  user_id?: number;
}
interface Event {
  created_at: string;
  created_by: string;
  description: string;
  end_time: string;
  event_id: number;
  event_name: string;
  location: string;
  start_time: string;
}
interface Registration {
  registered_id: number;
  user_id: number;
  event_id: number;
  registered_at: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_Id: string | null = null;

  user: User = {} as User;
  events: Event[] = [];
  registrations: Registration[] = [];

  userEvents: Event[] = [];
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_Id = params.get('id');
      console.log(this.user_Id);
    })
    this.loadData();
  }
  async loadData(){
    await this.getUserData();
    await this.getRegistrations();
    await this.getEvents();
    this.userEventsList();
  }

  userEventsList() {
    this.userEvents = this.registrations
      .filter(registration => registration.user_id === Number(this.user_Id))
      .map(registration => this.events.find(event => event.event_id === registration.event_id))
      .filter(event => event !== undefined) as Event[];
    console.log('userEvents', this.userEvents);
  }

  async getUserData(){
    console.log('getting user data');
    try{
      const response = await fetch('https://gui230.jitdesigns.com/api/Users/' + this.user_Id);
      const data = await response.json();
      this.user = JSON.parse(data);
    }catch(error){
      console.log(error);
    }
  }

  async getRegistrations(){
    try{
      const response = await fetch('https://gui230.jitdesigns.com/api/registrations');
      const data = await response.json();
      this.registrations = data;
      console.log(this.registrations);
    }catch(error){
      console.log(error);
    }
  }
  async getEvents(){
    try{
      const response = await fetch('https://gui230.jitdesigns.com/api/events');
      const data = await response.json();
      this.events = data
      console.log(this.events)
    }catch(error){
      console.log(error);
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }
  deleteRegistration(id: number){
    console.log('deleting registration', id);
    try{
    fetch('https://gui230.jitdesigns.com/api/registrations/delete/' + id, {
      method: 'POST',
    }).then(response => {
      if(response.ok){
        this.loadData();
      }
    })
  }catch(error){
    console.log(error);
  }
}
} 
