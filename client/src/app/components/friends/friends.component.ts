import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-frinds',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  tableargs = {data: [""], type: 'friend'}
  friendRequestArgs = {data: [""], type: 'friendrequest'}
  friendResponse : string[] = [];
  friendRequestResponse : string[] = [];
  //TODO: Replace simp with current user in constructor
  user = 'simp'

  constructor() {
    this.initPage(this.user)
  }

  ngOnInit(): void {
  }

  initPage(val: string) {
    axios.get(`/api/account/searchUsers`, { params: { prefix: val } })
    .then((res: any) => {
      console.log(res.data[0])
      if (typeof res.data[0] === 'undefined'){
        this.friendResponse = ["No Friends"]
      } else {
        this.friendResponse = res.data[0].friend
        this.friendRequestResponse = res.data[0].friend_request
      }
      this.tableargs = {data: this.friendResponse, type: 'friend'}
      this.friendRequestArgs = {data: this.friendRequestResponse, type: 'friendrequest'}
      console.log(this.tableargs)
    });
  }
}
