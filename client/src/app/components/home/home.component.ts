import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import axios from 'axios'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  interval: any;

  constructor(private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    // this.interval = setInterval(() => {
      axios.get(`/api/account/searchUsers`, { params: { prefix: this.curUser.user_name } })
      .then((res) => {
        if (typeof res.data[0] === 'undefined') {
          console.log('No matching users')
        } else {
          var newData = res.data[0].friend
          var old = this.curUser.friend
          // let difference = old.filter(x => !newData.includes(x));
          // if (difference.length != 0) {
          //   // for (var diff in difference) {
          //   //   this.snackBar.open(`Your friend request to ${diff} was accepted`, '', {
          //   //     duration:5000,
          //   //     verticalPosition:'top'
          //   //   });
          //   // }
          //   this.snackBar.open(`Your friend request to ${difference[0]} was accepted`, '', {
          //     duration:5000,
          //     verticalPosition:'top'
          //   });
          // }
          if (old.length < newData.length) {
            this.snackBar.open(`Your friend request to ${newData[newData.length - 1]} was accepted`, '', {
              duration:5000,
              verticalPosition:'top'
            });
            sessionStorage.setItem('curUser', JSON.stringify(res.data[0]));
          }
        }
      });
    // }, 5000);
  }

  ngOnChanges() {
    console.log("trigger on change")
    this.ngOnInit()
  }


}
