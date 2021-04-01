import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  closeResult = '';

  constructor(private modalService: NgbModal) { }

  tableargs1 = {data: [], type: 'List of Classes'};
  
  tableClassName: string[] = [];
  tableClassTag: string[] = [];

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  user = this.curUser.user_name;

  

  ngOnInit(): void {
    /*axios.get(`/api/dining/locations`, { params: { location: 'Hillenbrand' } })
      .then((res) => {
        console.log(res.data);
        this.diningData = res.data.Meals;
        this.tableargs1 = {data: res.data.Meals[0].Stations[0].Items, type: 'Breakfast'};
        this.tableargs2 = {data: res.data.Meals[1].Stations[0].Items, type: 'Lunch'};
        this.tableargs3 = {data: res.data.Meals[2].Stations[0].Items, type: 'Dinner'};
      });*/
      this.curUser = JSON.parse(sessionStorage.curUser || '{}');

  }

  searchResponse : string[] = [];
  name : string[] = [];
  type = 'none'
  tableargs = {data: this.searchResponse, type: this.type}
  tableargs2 = {data: this.name, type: 'name'}
  displayTagResult = false

  // getSearchValue(val: string) {
  //   axios.get(`/api/account/searchUsersCT`, { params: { prefix: val } })
  //   .then((res) => {
  //     console.log(res.data[0])
  //     if (typeof res.data[0] === 'undefined'){
  //       this.searchResponse = ["No matching class tag"]
  //     } else {
  //       // for (d in res.data[0]) {
  //       //   this.searchResponse.push(d.user_name)
  //       // }

  //       //TODO: temp solution until prefix is implemented
  //       this.searchResponse = [res.data[0].class_tag]
  //       // this.searchResponse = res.data[0];
  //     }
  //     this.type = 'searchTagResult'
  //     this.displayTagResult = true
  //     this.tableargs = {data: this.searchResponse, type: this.type}
  //   });
  // }

  getUserClasses(val: string) {
    console.log("searching class tags...")
    axios.get(`/api/account/searchClassTag`, { params: { prefix: val } })
    .then((res) => {
      console.log(res.data[0])
      if (typeof res.data[0] === 'undefined'){
        this.searchResponse = ["No matching class tag"]
        this.name = ["No matching class name"]
        console.log("no class");
      } else {
        this.searchResponse = [res.data[0].class_tag]
        this.name = [res.data[0].name]
      }
      this.type = 'searchTagResult'
      this.displayTagResult = true
      this.tableargs = {data: this.searchResponse, type: this.type}
      this.tableargs2 = {data: this.name, type: 'name'}
    })
    // .catch(error => {
    //   console.log(error.response)
    // });
  }

  onTabClick(event: any) {
    console.log(event.tab.textLabel);

  }

  addclass(){

  }

  open(content: any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
