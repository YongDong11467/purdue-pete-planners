

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-studygroup',
  templateUrl: './studygroup.component.html',
  styleUrls: ['./studygroup.component.css']
})
export class StudygroupComponent implements OnInit {

  constructor() {
    this.initPage(this.user);
  }
  curUser = JSON.parse(sessionStorage.curUser || '{}');
  user = this.curUser.user_name;
  //sample: string[] = ['test Course name 1'];
  tableargs1 = {data: [""], type: 'member'};
  tableargs2 = {data: [""], type: 'chat_room'};
  tableargs3 = {data: [""], type: 'study_room'};
  //tableargs4 = {data: [""], type: 'studyroom'};
  tablemember: string[] = [];
  tablechatroom: string[] = [];
  tablestudyroom: string[] = [];
  tablemeetingtime: Date;
  //tableargs4 = {data: ['Test Course name 1', this.tablemember, this.tablechatroom, this.tablestudyroom], type: 'studygroup'};
  StudyGroupData = {};


  tableargs = {data: [""], type: 'friend'}
  friendRequestArgs = {data: [""], type: 'friendrequest'}
  friendResponse : string[] = [];
  friendRequestResponse : string[] = [];
  // curUser = JSON.parse(sessionStorage.getItem('curUser') || '{}');
  // user = this.curUser.user_name

  ngOnInit(): void {
    this.initPage(this.user);
    //console.log(5 + 6);
  }

  initPage(val: string) {
    // console.log(this.tableargs1);
    // console.log(this.tableargs4);
    axios.get(`/api/account/searchStudyGroup`, { params: { prefix: 'CS 381' } })
      .then((res) => {
        console.log('this is checking');
        //console.log(res.data[0]);
        if (typeof res.data[0] === 'undefined') {
          this.tablemember = ["no such thing"];
          console.log(this.tablemember);
          console.log('this is checking 5');
        } else {
          this.tablemember = res.data[0].Member;
          this.tablechatroom = res.data[0].Chat_room;
          this.tablestudyroom = res.data[0].Study_room;
          this.tablemeetingtime = res.data[0].Meeting_time;
          console.log('this is checking 2');
          console.log(res.data[0]);
          console.log(this.tablemember);
          console.log('this is checking 3');
        }
        console.log(5 + 6);
        this.tableargs1 = {data: this.tablemember, type: 'member'};
        this.tableargs2 = {data: this.tablechatroom, type: 'chat_room'};
        this.tableargs3 = {data: this.tablestudyroom, type: 'study_room'};
        //this.tableargs4 = {data: this.tablemeetingtime, type: 'studygroup'};
        console.log(this.tableargs3);
        console.log(this.tablemeetingtime);
        // this.tablemember = {data: res.data[0].Member, type: 'member'};

        // console.log(this.tableargs3);
      });
  }

  onTabClick(event: any) {
    console.log(event.tab.textLabel);
    axios.get(`/api/account/searchStudyGroup`, { params: { prefix: event.tab.textLabel } })
      .then((res) => {
        console.log('this is checking');
        //console.log(res.data[0]);
        if (typeof res.data[0] === 'undefined') {
          this.tablemember = ["no such thing"];
          this.tablechatroom = ["no such thing"];
          this.tablestudyroom = ["no such thing"];
          //this.tablemeetingtime = Date.now;
          console.log(this.tablemember);
          console.log('this is checking 5');
        } else {
          this.tablemember = res.data[0].Member;
          this.tablechatroom = res.data[0].Chat_room;
          this.tablestudyroom = res.data[0].Study_room;
          this.tablemeetingtime = res.data[0].Meeting_time;
          console.log('this is checking 2');
          console.log(res.data[0]);
          console.log(this.tablemember);
          console.log('this is checking 3');
        }
        console.log(5 + 6);
        this.tableargs1 = {data: this.tablemember, type: 'member'};
        this.tableargs2 = {data: this.tablechatroom, type: 'chat_room'};
        this.tableargs3 = {data: this.tablestudyroom, type: 'study_room'};
        //this.tableargs4 = {data: this.tablemeetingtime, type: 'studygroup'};
        console.log(this.tableargs3);
        console.log(this.tablemeetingtime);
        // this.tablemember = {data: res.data[0].Member, type: 'member'};

        // console.log(this.tableargs3);
      });
  }

  refresh() {
    console.log("refreshing");
    this.initPage(this.user);
  }

  clickedjoin(event: any) {
    console.log(event.username);
  }

}
