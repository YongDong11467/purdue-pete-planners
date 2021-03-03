import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['friend'];
  dataSource = FRIEND_DATA;

}
