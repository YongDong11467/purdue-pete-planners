import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displaySearchResult = false
  displayMealResult = false
  displayFriendResult = false
  displayFriendRequest = false
  displayTagResult = false
  displayedColumns: string[] = [''];
  dataSource = new MatTableDataSource();
  curUser = JSON.parse(sessionStorage.curUser || '{}');
  bld = ''

  @Input() data:any;
  @Output() toFriendPage = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.data = {}
    this.bld = ''
  }

  ngOnInit(): void {
    if (this.data.type === 'search') {
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult', 'sendfr'];
    } else if (this.data.type === 'friend') {
      this.displayFriendResult = true
      this.displayedColumns = ['friend'];
    } else if (this.data.type === 'searchTagResult') {
      this.displayTagResult = true
      this.displayedColumns = ['searchTagResult', 'searchClassTag'];
    } else {
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.bld = this.data.type
    }
    this.dataSource = new MatTableDataSource(this.data.data);
    this.dataSource.paginator = this.paginator
    console.log(this.data)
  }

  ngOnChanges() {
    if (this.data.type === 'search') {
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult', 'sendfr'];
    } else if (this.data.type === 'friend') {
      this.displayFriendResult = true
      this.displayedColumns = ['friend'];
    } else if (this.data.type === 'friendrequest') {
      this.displayFriendRequest = true
      this.displayedColumns = ['friendrequest', 'accept', 'decline'];
    } else if (this.data.type === 'searchTagResult') {
      this.displayTagResult = true
      this.displayedColumns = ['searchTagResult', 'searchClassTag'];
    } else {
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.bld = this.data.type
    }
    this.dataSource = new MatTableDataSource(this.data.data);
    this.dataSource.paginator = this.paginator
  }

  clickedFriendRequest(username: any) {
    console.log(username)
    axios.post("/api/account/sendfr", { curUser: this.curUser.user_name, data: username })
  }

  clickedAccept(username: any) {
    axios.post("/api/account/updateUserInfo", { curUser: this.curUser.user_name, data: username, type:"acceptfr" }).then(res => 
    this.toFriendPage.emit(username))
    console.log(username)
  }

  clickedDecline(username: any) {
    axios.post("/api/account/updateUserInfo", { curUser: this.curUser.user_name, data: username, type:"declinefr" }).then(res => 
      this.toFriendPage.emit(username))
    console.log(username)
  }

  clickedAddClass(username: any) {
    console.log(username)
    axios.post("/api/account/searchClassTag", { curUser: this.curUser.classtag, data:  username})
  }

}
