import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  curUser = JSON.parse(sessionStorage.curUser || '{}');

  constructor() { }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    console.log(this.curUser)
  }

  ngOnChanges() {
    console.log("trigger on change")
    this.ngOnInit()
  }
}
