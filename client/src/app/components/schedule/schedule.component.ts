import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  // constructor(@Inject(CalendarOptions) private calendarOptions) {
  // }
  constructor() {
  }
  events = [];
  event = {};
  option = '';
  calendarOptions: CalendarOptions = {
    // dayGridDay, dayGridWeek
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
  };
  curUser;
  i = 0;
  due = [];
  realdue = []
  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    this.due = this.curUser.due;
    for (this.i = 0; this.i < this.due.length; this.i++ ) {
      // @ts-ignore
      this.realdue[this.i] = Object.values(this.due[this.i]);
    }
    console.log(this.realdue[0][0]);
    this.i = 0;
    for (this.i = 0; this.i < this.due.length; this.i++ ) {
      // @ts-ignore
      this.events[this.i] = {title: this.realdue[this.i][0], date: this.realdue[this.i][1]};
    }
    this.calendarOptions.events = this.events;
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  onaddEvent(form: NgForm) {
    console.log(form.value.title);
    console.log(form.value.content);
    this.event = {title: form.value.title, date: form.value.content};
    console.log(this.calendarOptions.events);
    // @ts-ignore
    this.events.push(this.event);
    console.log(this.events);
    this.calendarOptions.events = this.events;
    console.log(this.calendarOptions.events);
  }


}
