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
  interval: any;
  email = '';
  classlist = [];
  due = [];
  realdue = [];
  i = 0;


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    this.email = this.curUser.email;
    this.classlist = this.curUser.class_list;
    console.log(this.classlist);
    this.due = this.curUser.due;
    for (this.i = 0; this.i < this.due.length; this.i++ ) {
      // @ts-ignore
      this.realdue[this.i] = Object.values(this.due[this.i]);
    }
  }

  ngOnChanges() {
    console.log("trigger on change")
    this.ngOnInit()
  }
}


