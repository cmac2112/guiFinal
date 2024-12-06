import { Component, OnInit } from '@angular/core';
import { LoggedInService } from '../logged-in.service';
export interface Event{
  id: number;
  event_name: string;
  description: string;
  created_by: string;
  end_time: string;
  start_time: string;
  location: string;
  created_at: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(private loggedInService: LoggedInService) {
    console.log('logged in: ' + this.loggedInService.getLoggedIn());
  }
  //get events
  //allow user to create events
  //allow user to join events
  //allow user to leave events
  events: Event[] = [];
  ngOnInit() {
    //get events
    if(this.loggedInService.getLoggedIn()){
      this.getEvents();
  }
}
  async getEvents() {
    //get events
    const response = await fetch(`https://gui230.jitdesigns.com/api/events`);
    const data: Event[] = await response.json();
    this.events = data
    console.log(this.events)
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  };
  return date.toLocaleString('en-US', options);
}
}
