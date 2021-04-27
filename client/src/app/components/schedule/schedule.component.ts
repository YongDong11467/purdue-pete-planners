import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { NgForm } from '@angular/forms';
import { formatDate } from '@fullcalendar/angular';
import axios from 'axios';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  events = [];
  event2 = {title: '123', date: '2021-03-03'};
  event = {};
  option = '';


  calendarOptions: CalendarOptions = {
    // dayGridDay, dayGridWeek
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
  };
  curUser;
  i = 0;
  due = [];
  realdue = [];
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
    // @ts-ignore
    // this.events.push(this.event2);
    console.log(this.events);
    this.calendarOptions.events = this.events;
    console.log(this.calendarOptions.events);

  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  onSubmit(form: NgForm) {
    console.log(form.value.title);
    console.log(form.value.content);
    this.event = {title: form.value.title, date: form.value.content};
    console.log(this.calendarOptions.events);
    // @ts-ignore
    this.events.push(this.event);
    // @ts-ignore
    /*this.events.push(this.event);
    console.log(this.events);
    this.calendarOptions.events = this.events;
    console.log(this.calendarOptions.events);*/
    this.loading = true;
    axios.post('/api/schedule/createSchedule', {
      title: form.value.title,
      date: form.value.content,
      userName: this.curUser.user_name
    })
      .then((response) => {
        console.log(response);
        this.loading = true;
      });
  }
}
