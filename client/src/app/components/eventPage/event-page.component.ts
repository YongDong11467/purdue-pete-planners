import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import axios from 'axios';

@Component({
    selector: 'app-event-page',
    templateUrl: 'event-page.component.html',
    styleUrls: ['event-page.component.css']
  })
export class EventPageComponent implements OnInit /*, OnDestroy */{
  //Data service vars
  currentMessage:string;
  @Input() idToSend:string;
  @Output() toEventEdit = new EventEmitter();

  constructor(private router: Router) { 

  }

    //Current user
    curUser = JSON.parse(sessionStorage.curUser || '{}');
    user = this.curUser.user_name;

    //Storage for events to be displayed
    tabs;
    tabsAll;
    
    

    ngOnInit(): void {
        this.curUser = JSON.parse(sessionStorage.curUser || '{}');
        this.getAllUserEvents(this.curUser.user_name);
        this.getAllEvents();
    }

    sendID(sendId){
      //console.log(sendId);
      const navigationExtras: NavigationExtras = {state: {id: sendId}};
      this.router.navigate(['eventEdit'], navigationExtras);
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
                //console.log(this.tabsAll[i].name);
              }
              
            }
          });
      }
}