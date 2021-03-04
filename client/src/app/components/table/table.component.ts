import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data:any;

  constructor() {
    this.data = {}
    this.bld = ''
  }

  displaySearchResult = false
  displayMealResult = false
  displayFriendResult = false
  displayedColumns: string[] = [''];
  dataSource = [];
  bld = ''

  ngOnInit(): void {
    if (this.data.type === 'search') {
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult'];
    } else if (this.data.type === 'friend') {
      this.displayFriendResult = true
      this.displayedColumns = ['friend'];
    } else {
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.bld = this.data.type
    }
    this.dataSource = this.data.data
    console.log(this.data)
  }

  //TODO: cleanup

  ngOnChanges() {
    if (this.data.type === 'search') {
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult', 'sendfr'];
    } else if (this.data.type === 'friend') {
      this.displayFriendResult = true
      this.displayedColumns = ['friend'];
    } else {
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.bld = this.data.type
    }
    this.dataSource = this.data.data
  }   

  clickedFriendRequest(username: any) {
    console.log(username)
  }

}
