import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gensearch',
  templateUrl: './gensearch.component.html',
  styleUrls: ['./gensearch.component.css']
})
export class GensearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  filter = '1';
  searchResponse : string[] = [];
  type = 'none'
  tableargs = {data: this.searchResponse, type: this.type}
  displaySearchResult = false

  getSearchValue(val: string) {
    console.log(val)
    if (this.filter == '1') {
      
    } else if (this.filter == '2') {

    } else if (this.filter == '3') {
      console.log("Searching for users with class tag")
    }
  }
}
