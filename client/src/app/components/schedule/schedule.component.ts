import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  // constructor(@Inject(CalendarOptions) private calendarOptions) {
    
  // }

  constructor() {}

  /*viewDate: Date = new Date();*/
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth'
    };
  }
}
