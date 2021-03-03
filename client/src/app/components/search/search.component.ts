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

  getSearchValue(val: string) {
    axios.get(`/api/account/searchUser`, { params: { prefix: val } })
    .then((res) => {
      console.log(res.data)
      this.searchResponse = res.data;
    });
  }

}
