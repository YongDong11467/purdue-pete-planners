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
  }

  displaySearchResult = false
  displayFriendResult = true
  displayedColumns: string[] = ['friend'];
  dataSource = FRIEND_DATA;

  ngOnInit(): void {
    if (this.data.type === 'search') {
      this.displayFriendResult = false
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult'];
      this.dataSource = this.data.data
    }
    console.log(this.data)
  }

  //TODO: cleanup

  // ngOnChanges() {
  //   console.log(this.data.type === 'search')
  //   if (this.data.type === 'search') {
  //     this.displaySearchResult = true;
  //     this.dataSource = this.data.data
  //   }
  // }   


}
