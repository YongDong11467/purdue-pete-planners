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

  //event vars
  name: string = '';
  desc: string = '';
  dTime: string = '';
  link: string = '';
  location: string = '';
  repeat: number = 0;

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
    //alert('HEY');
    // stop here if form is invalid
    alert(this.name + this.desc + this.link + this.location + this.dTime + this.repeat);
    if (this.form.invalid) {
      //alert('hey');
      return;
    }
    this.loading = true;
    axios.post("/api/events/createEvent", { name:this.name, description:this.desc, link:this.link, location:this.location, Time:this.dTime, repeat:this.repeat} , 
     {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res: any) => {
      console.log(res)
    });
    this.submitted = true;
    this.loading = false;
    //alert("you better fucking not have");
  }


  onAddEvent(nameInput: HTMLInputElement, descInput: HTMLTextAreaElement, linkInput: HTMLInputElement, locInput: HTMLInputElement, dTimeInput: HTMLInputElement, repeatInput: number){
    this.name = nameInput.value;
    this.desc = descInput.value;
    this.link = linkInput.value;
    this.location = locInput.value;
    this.dTime = dTimeInput.value;
    this.repeat = repeatInput;
    //alert('BITCH');
  }

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
