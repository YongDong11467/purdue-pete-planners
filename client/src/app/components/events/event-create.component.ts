import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent implements OnInit {

  /*
  //event vars
  name: String = '';
  desc: String = '';
  dTime: String = '';
  link: String = '';
  location: String = '';
  */
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

    axios.post('/api/events/createEvent', {
      name : n,
      description : e,
      Time : d,
      link : l,
      location : L,
      repeat : r,
      owner : user
    })
    .then((response) => {
      console.log(response);
      this.loading = true;
    });


    //alert("you better fucking not have");
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
