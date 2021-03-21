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

  searchResponse : string[] = [];
  type = 'none'
  tableargs = {data: this.searchResponse, type: this.type}
  displaySearchResult = false

  getSearchValue(val: string) {
    console.log(val)
  }
}
