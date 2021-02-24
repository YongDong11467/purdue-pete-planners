import { Component } from '@angular/core';
import axios, { AxiosResponse } from "axios";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'purdue-pete-planners';
  // Getting data from node backend example
  fetchdining() {
    axios.get(`/api/dining`)
    .then((res) => {
      console.log(res.data)
      this.title = res.data;
    });
  }
}
