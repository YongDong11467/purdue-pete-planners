

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
  tableargs4 = {data: [""], type: 'announcement'};
  tableargs6 = {data: [""], type: 'comments'};
  tablemember: string[] = [];
  tablechatroom: string[] = [];
  tablestudyroom: string[] = [];
  tablemeetingtime: Date;

  tableannoucement: string[] = [];
  isMemeber = false;
  StudyGroupData = this.curUser.study_group;
  //inviting users
  expanded = false;
  displaySearchResult = false;
  searchResponse: string[] = [];
  type = 'none';
  tableargs5 = {data: this.searchResponse, type: this.type};
  //comments
  displayComments = true;
  tablecomments: string[] = [];

  //StudyGroupData = {};
  name = [];



  ngOnInit(): void {
    this.name = this.curUser.study_group;
    console.log(this.name);
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
          this.tableannoucement = res.data[0].Announcement;
          this.tablecomments = res.data[0].Comments;
          console.log(res.data[0]);
          console.log(this.tableannoucement);
          console.log(this.tablemember);
          console.log(this.tablecomments);
        }
        this.tableargs1 = {data: this.tablemember, type: 'member'};
        this.tableargs2 = {data: this.tablechatroom, type: 'chat_room'};
        this.tableargs3 = {data: this.tablestudyroom, type: 'study_room'};
        this.tableargs4 = {data: this.tableannoucement, type: 'announcement'};
        this.tableargs6 = {data: this.tablecomments, type: 'Comments'};
        console.log(this.tableargs3);
        console.log(this.tableargs4);
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
          this.tableannoucement = res.data[0].Announcement;
          this.tablecomments = res.data[0].Comments;
          console.log(res.data[0]);
          console.log(this.tablemember);
        }
        this.tableargs1 = {data: this.tablemember, type: 'member'};
        this.tableargs2 = {data: this.tablechatroom, type: 'chat_room'};
        this.tableargs3 = {data: this.tablestudyroom, type: 'study_room'};
        this.tableargs4 = {data: this.tableannoucement, type: 'announcement'};
        this.tableargs6 = {data: this.tablecomments, type: 'Comments'};
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

  getSearchValue(val: string) {
    axios.get(`/api/account/searchUsers`, {params: {prefix: val}})
      .then((res) => {
        console.log(res.data[0])
        if (typeof res.data[0] === 'undefined') {
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
        this.tableargs5 = {data: this.searchResponse, type: this.type}
      });
  }
}
