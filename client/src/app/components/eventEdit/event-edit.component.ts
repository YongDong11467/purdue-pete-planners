import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { createEventInstance } from '@fullcalendar/common';

declare function createEvent(name:string, description:string, time:string, link:string, location:string, repeat:number): any;

@Component({
  selector: 'app-event-create',
  templateUrl: './event-edit.component.html',
})
export class EventCreateComponent implements OnInit {

  name = '';
  desc = '';
  dTime = '';
  link = '';
  location = '';
  repeat: number = 0;

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      link: [''],
      location: ['', Validators.required],
      eventDate: [null, Validators.required],
      repeatChoice: [null]
    });
  }

  //TODO
  //Change this to autofill from db
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      link: [''],
      location: ['', Validators.required],
      eventDate: [null, Validators.required],
      repeatChoice: [null]
    });
  }

  get f() { return this.form.controls; }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    // alert('hey');
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    
  }

}