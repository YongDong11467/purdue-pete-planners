import { Component, OnInit, Input, ɵCompiler_compileModuleSync__POST_R3__, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import {DataService} from "../../data.service";
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-event-page',
    templateUrl: 'event-page.component.html',
    styleUrls: ['event-page.component.css']
  })
export class EventPageComponent implements OnInit, OnDestroy{

  constructor(private modalService: NgbModal,
              private data: DataService) { }
    curUser = JSON.parse(sessionStorage.curUser || '{}');
    user = this.curUser.user_name;

    displaySearchResult = false;
    searchResponse : string[] = [];
    type = 'none';
    table_args_event_list = {data: this.searchResponse, type: this.type};

    tabs;
    tabsAll;
    
    message:string;
    subscription: Subscription;

    ngOnInit(): void {
        this.curUser = JSON.parse(sessionStorage.curUser || '{}');
        this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
        //console.log(this.curUser.user_name)
        //console.log(this.curUser);
        this.getAllUserEvents(this.curUser.user_name);
        //console.log("alsdgjalksgalk");
        this.getAllEvents();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    sendID(id){
      console.log("sendID proc");
      console.log(id);
      this.data.changeMessage(id);
    }

    getAllUserEvents(val:string){
        console.log("Searching for all user created events")
          axios.get(`/api/events/searchUserEvent`, { params: { prefix: val } })
          .then((res) => {
            //console.log(res.data[0])
            if (typeof res.data[0] == 'undefined'){
              this.searchResponse = ["No user events"];
            } else {
              this.tabs = new Array(res.data.length);
              for(let i = 0; i < res.data.length; i++){
                this.tabs[i] = res.data[i];
              }
            }
            //this.type = 'search'
            //this.displaySearchResult = true
            //this.table_args_event_list = {data: this.searchResponse, type: this.type}
            //console.log(this.table_args_event_list)
          });
      }

      getAllEvents(){
        axios.get("/api/events/getAllEvents")
          .then((res) => {
            if (typeof res.data[0] == 'undefined'){
              this.searchResponse = ["No user events"];
            } else {
              this.tabsAll = new Array(res.data.length);
              for(let i = 0; i < res.data.length; i++){
                this.tabsAll[i] = res.data[i];
                console.log(this.tabsAll[i].name);
              }
              
            }
          });
      }
}