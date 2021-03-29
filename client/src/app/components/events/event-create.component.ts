import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import axios from 'axios'
//import {searchUsers} from 'server/account_manager.js';

//declare function createEvent(name:string, description:string, time:string, link:string, location:string, repeat:number): any;
 //const thing = require('./server/account_manager.js');
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
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


  onAddEvent(nameInput: HTMLInputElement, descInput: HTMLTextAreaElement, linkInput: HTMLInputElement, locInput: HTMLInputElement, dTimeInput: HTMLInputElement, repeatInput: number){
    this.name = nameInput.value;
    this.desc = descInput.value;
    this.link = linkInput.value;
    this.location = locInput.value;
    this.dTime = dTimeInput.value;
    this.repeat = repeatInput;

    //thing.createEvent(this.name, this.desc, this.dTime, this.link, this.location, this.repeat);

  }

  repeatChoiceHandler(event: any){

    this.repeat = event.target.value;

  }

}
