import { Component, Input, OnInit } from '@angular/core';

export interface FriendCell {
  name: string;
  pending: boolean;
}

const FRIEND_DATA: FriendCell[] = [
  {name: 'Hydrogen', pending: false},
  {name: 'Bobby', pending: false},
];

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
  displayFriendResult = true
  displayedColumns: string[] = ['friend'];
  dataSource = FRIEND_DATA;
  bld = ''

  ngOnInit(): void {
    if (this.data.type === 'search') {
      this.displayFriendResult = false
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult'];
      this.dataSource = this.data.data
    } else {
      this.displayFriendResult = false
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.dataSource = this.data.data
      this.bld = this.data.type
    }
    console.log(this.data)
  }

  //TODO: cleanup

  ngOnChanges() {
    if (this.data.type === 'search') {
      this.displayFriendResult = false
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult'];
      this.dataSource = this.data.data
    } else {
      this.displayFriendResult = false
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.dataSource = this.data.data
      this.bld = this.data.type
    }
  }   


}
