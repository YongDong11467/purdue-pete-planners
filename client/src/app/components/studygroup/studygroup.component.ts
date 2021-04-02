

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
  curStudyGroup = 'CS 381';
  tableargs1 = {data: [""], type: 'member'};
  tableargs2 = {data: [""], type: 'chat_room'};
  tableargs3 = {data: [""], type: 'study_room'};
  tablemember: string[] = [];
  tablechatroom: string[] = [];
  tablestudyroom: string[] = [];
  tablemeetingtime: Date;
  StudyGroupData = {};


  ngOnInit(): void {
    this.initPage(this.user);
  }

  initPage(val: string) {
    axios.get(`/api/account/searchStudyGroup`, { params: { prefix: 'CS 381' } })
      .then((res) => {
        if (typeof res.data[0] === 'undefined') {
          this.tablemember = ["no member"];
          this.tablechatroom = ["no chat room"];
          this.tablestudyroom = ["no study room"];
          console.log(this.tablemember);
        } else {
          this.tablemember = res.data[0].Member;
          this.tablechatroom = res.data[0].Chat_room;
          this.tablestudyroom = res.data[0].Study_room;
          this.tablemeetingtime = res.data[0].Meeting_time;
          console.log(res.data[0]);
          console.log(this.tablemember);
        }
        this.tableargs1 = {data: this.tablemember, type: 'member'};
        this.tableargs2 = {data: this.tablechatroom, type: 'chat_room'};
        this.tableargs3 = {data: this.tablestudyroom, type: 'study_room'};
        console.log(this.tableargs3);
        console.log(this.tablemeetingtime);
      });
  }

  onTabClick(event: any) {
    console.log(event.tab.textLabel);
    this.curStudyGroup = event.tab.textLabel;
    axios.get(`/api/account/searchStudyGroup`, { params: { prefix: event.tab.textLabel } })
      .then((res) => {
        if (typeof res.data[0] === 'undefined') {
          this.tablemember = ["no member"];
          this.tablechatroom = ["no chat room"];
          this.tablestudyroom = ["no study room"];
          console.log(this.tablemember);
        } else {
          this.tablemember = res.data[0].Member;
          this.tablechatroom = res.data[0].Chat_room;
          this.tablestudyroom = res.data[0].Study_room;
          this.tablemeetingtime = res.data[0].Meeting_time;
          console.log(res.data[0]);
          console.log(this.tablemember);
        }
        this.tableargs1 = {data: this.tablemember, type: 'member'};
        this.tableargs2 = {data: this.tablechatroom, type: 'chat_room'};
        this.tableargs3 = {data: this.tablestudyroom, type: 'study_room'};
        console.log(this.tableargs3);
        console.log(this.tablemeetingtime);
      });
  }

  refresh() {
    console.log("refreshing");
    this.initPage(this.user);
  }

  clickedjoin(event: any) {
    axios.post('/api/account/updateStudyGroupRequest', { curUser: this.curUser.user_name, data: this.curStudyGroup });
  }

}
