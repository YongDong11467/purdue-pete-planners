import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import axios from 'axios';
import {DataService} from "../../data.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent implements OnInit, OnDestroy {

  message:string;
  subscription: Subscription;
  repeat: number = 0;
  currentEvent;

  //submission vars
  form: FormGroup;
  loading = false;
  submitted = false;

  //button toggle
  expanded = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService
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

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
    this.form = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      link: [''],
      location: ['', Validators.required],
      eventDate: [null, Validators.required],
      repeatChoice: [null]
    });

    this.getCurrentEvent();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
  getCurrentEvent(){
    axios.get("/api/events/getCurrentEvent", { params: { prefix: this.message } })
    .then((res) => {
      if (typeof res.data[0] == 'undefined'){
        this.searchResponse = ["No user events"];
      } else {
        console.log(res.data.name);
        this.currentEvent = res.data;
      }
    });
  }


  get f() { return this.form.controls; }

  // tslint:disable-next-line:typedef
  onSubmit() {

    let curUser = JSON.parse(sessionStorage.curUser || '{}');
    let user = [curUser.user_name];

    this.submitted = true;
    let n = this.f.eventName.value;
    let e = this.f.eventDescription.value;
    let l = this.f.link.value;
    let L = this.f.location.value;
    let d = this.f.eventDate.value;
    let r = this.repeat;

    if (this.form.invalid) {
      //alert('hey');
      return;
    }
    this.loading = true;

    
  }
  
  updateEvent(){

  }

  //Handles choosing repetiion for schedule
  repeatChoiceHandler(event: any){
    this.repeat = event.target.value;
  }

  //Code from search component, reusing here for inviting users to events
  searchResponse : string[] = [];
  type = 'none'
  tableargs = {data: this.searchResponse, type: this.type}
  displaySearchResult = false

  getSearchValue(val: string) {
    axios.get(`/api/account/searchUsers`, { params: { prefix: val } })
    .then((res) => {
      console.log(res.data[0])
      if (typeof res.data[0] === 'undefined'){
        this.searchResponse = ["No matching user"]
      } else {
        // for (d in res.data[0]) {
        //   this.searchResponse.push(d.user_name)
        // }

        //TODO: temp solution until prefix is impulmented
        this.searchResponse = [res.data[0].user_name]
        // this.searchResponse = res.data[0];
      }
      this.type = 'search'
      this.displaySearchResult = true
      this.tableargs = {data: this.searchResponse, type: this.type}
    });
  }
}
