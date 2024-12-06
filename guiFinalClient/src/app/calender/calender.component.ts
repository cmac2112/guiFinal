import {
  Component,
  Signal,
  WritableSignal,
  computed,
  Input,
  signal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
  meetings: { [key: string]: string[] } = {};  

  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      });
  });
  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 }),
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 }),
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }
  DATE_MED = DateTime.DATE_MED;

  activeDayMeetings: Signal<string[]> = computed(() => {
    this.getEvents();
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();
  
    if (!activeDayISO) {
      return [];
    }
  
    // Correctly access the meetings object
    return this.meetings[activeDayISO] ?? [];
  });

  constructor(private http: HttpClient) {}

  getEvents(): void {
    const url = 'https://gui230.jitdesigns.com/api/events';
  
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        data.forEach((event) => {
          const dateKey = DateTime.fromISO(event.start_time).toISODate();
  
          if (dateKey) {
            // Convert start and end times to local timezone and remove seconds and milliseconds
            const startTime = DateTime.fromISO(event.start_time)
              .setZone('local')  // Ensure it is in local timezone
              .toLocaleString({ 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric' 
              });
  
            const endTime = DateTime.fromISO(event.end_time)
              .setZone('local')  // Ensure it is in local timezone
              .toLocaleString({ 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric' 
              });
  
            // Check if the dateKey already exists, and if not, create an empty array
            if (!this.meetings[dateKey]) {
              this.meetings[dateKey] = [];
            }
  
            // Push event details with the formatted times and a "divider" for spacing between events
            this.meetings[dateKey].push(
              `Event Name: ${event.event_name}`,
              `Description: ${event.description}`,
              `Location: ${event.location}`,
              `Start Time: ${startTime}`,
              `End Time: ${endTime}`,
              `Created By: ${event.created_by}`,
              "divider" // Special marker for empty space
            );
          }
        });
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }  
}