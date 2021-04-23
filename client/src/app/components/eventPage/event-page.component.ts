import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios'

@Component({
    selector: 'app-event-page',
    templateUrl: 'event-page.component.html',
    styleUrls: ['event-page.component.css']
  })
export class EventPageComponent implements OnInit{

  constructor(private modalService: NgbModal) { }
    curUser = JSON.parse(sessionStorage.curUser || '{}');
    user = this.curUser.user_name;

    displaySearchResult = false
    searchResponse : string[] = [];
    type = 'none'
    table_args_event_list = {data: this.searchResponse, type: this.type}

    ngOnInit(): void {
        this.curUser = JSON.parse(sessionStorage.curUser || '{}');
        //console.log(this.curUser.user_name)
        console.log(this.curUser);
        this.getAllUserEvents(this.curUser.user_name);
    }

    getAllUserEvents(val:string){
        console.log("Searching for all user created events")
          axios.get(`/api/events/searchUserEvent`, { params: { prefix: val } })
          .then((res) => {
            //console.log(res.data[0])
            if (typeof res.data[0] === 'undefined'){
              this.searchResponse = ["No user events"]
            } else {
              this.searchResponse = [res.data[0].user_name]
            }
            this.type = 'search'
            this.displaySearchResult = true
            this.table_args_event_list = {data: this.searchResponse, type: this.type}
            console.log(this.table_args_event_list)
          });
      }
}