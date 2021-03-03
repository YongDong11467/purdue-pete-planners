import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchResponse = []
  type = 'none'
  tableargs = {data: this.searchResponse, type: this.type}
  displaySearchResult = false

  getSearchValue(val: string) {
    axios.get(`/api/account/searchUsers`, { params: { prefix: val } })
    .then((res) => {
      console.log(res.data)
      this.searchResponse = res.data;
      this.type = 'search'
      this.displaySearchResult = true
      this.tableargs = {data: this.searchResponse, type: this.type}
    });
  }

}
