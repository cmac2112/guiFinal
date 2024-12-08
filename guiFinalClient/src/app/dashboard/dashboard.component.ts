import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoggedInService } from '../logged-in.service';
export interface Event {
  created_at: string;
  created_by: string;
  description: string;
  end_time: string;
  event_id: number;
  event_name: string;
  location: string;
  start_time: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
  error = '';

  event_name: string = '';
  description: string = '';
  location: string = '';
  start_time: string = '';
  end_time: string = '';

  ngOnInit() {
    //get events
    if (this.loggedInService.getLoggedIn()) {
      this.getEvents();
    }
  }
  async getEvents() {
    //get events
    try {
      const response = await fetch(`https://gui230.jitdesigns.com/api/events`);
      const data: Event[] = await response.json();
      this.events = data;
      console.log(this.events);
    } catch (err) {
      console.log(err);
      this.error = 'Error fetching events';
      setTimeout(() => {
        this.error = '';
      }, 5000);
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

  async RSVP(event: number) {
    //allow user to join events
    console.log(this.loggedInService.getCurrentUser());
    console.log('RSVP to ' + event);
    const currentUser = this.loggedInService.getCurrentUser();

    try {
      const response = await fetch(
        `https://gui230.jitdesigns.com/api/registrations/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_id: event,
            user_id: currentUser.user_id,
          }),
        }
      );
      if (response.ok) {
        this.getEvents();
        console.log('RSVP successful');
        this.error = 'Registered for event';
        setTimeout(() => {
          this.error = '';
        }, 5000);
      } else {
        console.log('RSVP failed');
        this.error = 'Error registering for event';
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async CreateEvent() {
    console.log('creating event');
    try {
      const response = await fetch(
        `https://gui230.jitdesigns.com/api/addevent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_name: this.event_name,
            description: this.description,
            location: this.location,
            start_time: this.start_time,
            end_time: this.end_time,
            created_by: this.loggedInService.getCurrentUser().user_id,
          }),
        }
      );
      if (response.ok) {
        this.getEvents();
      } else {
        this.error = 'Error creating event';
        setTimeout(() => {
          this.error = '';
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      this.error = 'Error creating event';
      setTimeout(() => {
        this.error = '';
      }, 5000);
    }
  }
}
