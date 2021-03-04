import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  tableargs = {data: [""], type: 'friend'}

  ngOnInit(): void {
    this.tableargs = {data: ["sam", "billy" ], type: 'friend'}
  }

}
