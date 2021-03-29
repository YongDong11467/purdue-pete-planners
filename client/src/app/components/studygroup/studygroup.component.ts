

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-studygroup',
  templateUrl: './studygroup.component.html',
  styleUrls: ['./studygroup.component.css']
})
export class StudygroupComponent implements OnInit {

  constructor() { }
  curUser = JSON.parse(sessionStorage.curUser || '{}');
  tableargs1 = {data: ["Test Course name 1", ['Jack', 'Alex', 'Mary'], ['ChatRoom1'], ['Study Room 1']], type: 'Demo Study group 1'};
  tableargs2 = {data: [], type: 'Study group 2'};
  tableargs3 = {data: [], type: 'studygroup'};
  tablemember = {data: [], type: 'member'};
  tablechatroom = {data: [], type: 'studygroup'};
  tablestudyroom = {data: [""], type: 'studygroup'};
  tableargs4 = {data: ['Test Course name 1', this.tablemember, this.tablechatroom, this.tablestudyroom], type: 'studygroup'};
  StudyGroupData = {};

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    console.log(this.tableargs1);
    console.log(this.tableargs4);
    /*axios.get(`/api/account/searchStudyGroup`, { params: { prefix: 'Test Course name 1' } })
      .then((res) => {
        console.log(res.data);
        this.diningData = res.data.Meals;
        this.tableargs1 = {data: res.data.Meals[0].Stations[0].Items, type: 'Breakfast'};
        this.tableargs2 = {data: res.data.Meals[1].Stations[0].Items, type: 'Lunch'};
        this.tableargs3 = {data: res.data.Meals[2].Stations[0].Items, type: 'Dinner'};
        this.tableargs3 = {data: res.data[0], type: 'studygroup'};
        this.tablemember = {data: res.data[0].Member, type: 'member'};
        this.tablechatroom = {data: res.data[0].Chat_room, type: 'chat_room'};
        this.tablestudyroom = {data: res.data[0].Study_room, type: 'study_room'};
      });*/

    console.log(this.tableargs3);
  }

  onTabClick(event: any) {
    console.log(event.tab.textLabel);
    /*axios.get(`/api/dining/locations`, { params: { location: event.tab.textLabel } })
      .then((res) => {
        console.log(res.data);
        this.diningData = res.data.Meals;
        this.tableargs1 = {data: res.data.Meals[0].Stations[0].Items, type: 'Breakfast'};
        this.tableargs2 = {data: res.data.Meals[1].Stations[0].Items, type: 'Lunch'};
        this.tableargs3 = {data: res.data.Meals[2].Stations[0].Items, type: 'Dinner'};
        console.log(this.tableargs1);
      });*/
  }

}
