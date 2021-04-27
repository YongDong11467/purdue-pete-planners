import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  email = '';
  classlist = [];
  className = [];
  due = [];
  realdue = [];
  i = 0;
  j = 0;
  friendLen = 0


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    this.friendLen = (this.curUser.friend).length
    this.email = this.curUser.email;
    this.classlist = this.curUser.class_list;
    console.log(Object.values(this.classlist[0]));
    /*for (this.j = 0; this.j < this.classlist.length; this.j++) {
      // @ts-ignore
      this.className[this.j] = this.curUser.class_list[this.j].class_tag;
    }*/
    console.log(this.classlist);
    this.due = this.curUser.due;
    if (typeof this.due !== 'undefined') {
      for (this.i = 0; this.i < this.due.length; this.i++ ) {
        // @ts-ignore
        this.realdue[this.i] = Object.values(this.due[this.i]);
      }
   }
  }

  ngOnChanges() {
    console.log("trigger on change")
    this.ngOnInit()
  }
}


