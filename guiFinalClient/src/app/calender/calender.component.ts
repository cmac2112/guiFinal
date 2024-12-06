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
            if (!this.meetings[dateKey]) {
              this.meetings[dateKey] = [];
            }
            
            this.meetings[dateKey].push(
              event.event_name,
              event.description,
              event.location,
              event.start_time,
              event.end_time,
              event.created_by
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