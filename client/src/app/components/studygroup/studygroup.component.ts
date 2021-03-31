

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
  sample: string[] = ['test Course name 1'];
  tableargs1 = {data: this.sample, type: 'Demo Study group 1'};
  tableargs2 = {data: [], type: 'Study group 2'};
  tableargs3 = {data: [""], type: 'studygroup'};
  tablemember: string[] = [];
  tablechatroom = {data: [], type: 'studygroup chatroom'};
  tablestudyroom = {data: [""], type: 'studygroup study room'};
  tableargs4 = {data: ['Test Course name 1', this.tablemember, this.tablechatroom, this.tablestudyroom], type: 'studygroup'};
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
    axios.get(`/api/account/searchStudyGroup`, { params: { prefix: 'Test Course name 1' } })
      .then((res) => {
        console.log('this is checking');
        //console.log(res.data[0]);
        if (typeof res.data[0] === 'undefined') {
          this.tablemember = ["no such thing"];
          console.log(this.tablemember);
          console.log('this is checking 5');
        } else {
          this.tablemember = res.data[0].Member;
          console.log('this is checking 2');
          console.log(res.data[0]);
          console.log(this.tablemember);
          console.log('this is checking 3');
        }
        console.log(5 + 6);
        this.tableargs3 = {data: this.tablemember, type: 'studygroup'};
        console.log(this.tableargs3);
        // this.tablemember = {data: res.data[0].Member, type: 'member'};
        this.tablechatroom = {data: res.data[0].Chat_room, type: 'chat_room'};
        this.tablestudyroom = {data: res.data[0].Study_room, type: 'study_room'};
        // console.log(this.tableargs3);
        console.log(6);
      });
    axios.get(`/api/account/searchUsers`, { params: { prefix: val } })
      .then((res: any) => {
        console.log(res.data[0])
        if (typeof res.data[0] === 'undefined') {
          this.friendResponse = ["No Friends"]
        } else {
          this.friendResponse = res.data[0].friend
          this.friendRequestResponse = res.data[0].friend_request
        }
        this.tableargs = {data: this.friendResponse, type: 'friend'}
        this.friendRequestArgs = {data: this.friendRequestResponse, type: 'friendrequest'}
        console.log(this.tableargs)
      });
  }

  onTabClick(event: any) {
    /*console.log(event.tab.textLabel);
    axios.get(`/api/account/searchStudyGroup`, { params: { prefix: 'Test Course name 1' } })
      .then((res) => {
        console.log(res.data[0]);

        this.tablemember = res.data[0].Member;
        this.tableargs3 = {data: this.tablemember, type: 'studygroup'};
        // this.tablemember = {data: res.data[0].Member, type: 'member'};
        this.tablechatroom = {data: res.data[0].Chat_room, type: 'chat_room'};
        this.tablestudyroom = {data: res.data[0].Study_room, type: 'study_room'};
        console.log(this.tableargs3);
      });*/
  }

  refresh() {
    console.log("refreshing");
    this.initPage(this.user);
  }

}
