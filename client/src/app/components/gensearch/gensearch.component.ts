import { Component, OnInit } from '@angular/core';
import axios from 'axios'

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
      axios.get(`/api/account/searchUsersCT`, { params: { classtag: val } })
      .then((res) => {
        console.log(res.data[0])
        if (typeof res.data[0] === 'undefined'){
          this.searchResponse = ["No matching user"]
        } else {
          // for (d in res.data[0]) {
          //   this.searchResponse.push(d.user_name)
          // }
  
          this.searchResponse = ['tom', 'bob', 'timmy']
          this.searchResponse = res.data[0].students;
        }
        this.type = 'search'
        this.displaySearchResult = true
        console.log(this.searchResponse)
        this.tableargs = {data: this.searchResponse, type: this.type}
      });
    }
  }
}
