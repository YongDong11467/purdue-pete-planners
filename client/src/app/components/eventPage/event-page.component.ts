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
export class EventPageComponent implements OnInit /*, OnDestroy */{
  //Data service vars
  currentMessage:string;
  constructor(private data: DataService) { 
    //this.data.currentMessage.subscribe(msg => console.log("constructor msg", msg));
    
  }

    //Current user
    curUser = JSON.parse(sessionStorage.curUser || '{}');
    user = this.curUser.user_name;

    //Storage for events to be displayed
    tabs;
    tabsAll;
    
    
    //subscription: Subscription;

    ngOnInit(): void {
        this.data.currentMessage.subscribe(result => { this.currentMessage = result;});
        this.curUser = JSON.parse(sessionStorage.curUser || '{}');
        this.getAllUserEvents(this.curUser.user_name);
        this.getAllEvents();
    }
/*
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
*/
/*
    updateID(){
      this.data.currentMessage.subscribe(msg => {
        this.message = msg;
      });
      console.log("message:", this.message);
    }
    */
    newMessage(id){
      console.log("sendID proc");
      //console.log(id);
      this.currentMessage = id;
      this.data.changeMessage(this.currentMessage);
      //this.updateID();
      //console.log("newmessage()", this.message);
    }

    getAllUserEvents(val:string){
        console.log("Searching for all user created events")
          axios.get(`/api/events/searchUserEvent`, { params: { prefix: val } })
          .then((res) => {
            //console.log(res.data[0])
            if (typeof res.data[0] == 'undefined'){
              //this.searchResponse = ["No user events"];
              console.log("No user events");
            } else {
              this.tabs = new Array(res.data.length);
              for(let i = 0; i < res.data.length; i++){
                this.tabs[i] = res.data[i];
              }
            }
          });
      }

      getAllEvents(){
        axios.get("/api/events/getAllEvents")
          .then((res) => {
            if (typeof res.data[0] == 'undefined'){
              //this.searchResponse = ["No user events"];
              console.log("No user events");
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