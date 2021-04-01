import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  curUser = JSON.parse(sessionStorage.curUser || '{}');

  constructor(private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    console.log(this.curUser)
    if (this.curUser.user_name == 'tom') {
      this.snackBar.open("Your friend request was accepted", '', {
        duration:3000,
        verticalPosition:'top'
      });
    }
  }

  ngOnChanges() {
    console.log("trigger on change")
    this.ngOnInit()
  }


}
