import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import axios from 'axios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ClassComponent implements OnInit {
  closeResult = '';

  constructor(private modalService: NgbModal) { }

  tableargs1 = {data: [], type: 'List of Classes'};
  tabs = ['cs406', 'cs408', 'cs422'];

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  user = this.curUser.user_name;

  ngOnInit(): void {
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    //console.log(this.curUser.user_name)
    console.log(this.curUser)
    this.getAllUserClasses(this.curUser.user_name)
  }

  searchResponse : string[] = [];
  name : string[] = [];
  type = 'none'
  tableargs = {data: this.searchResponse, type: this.type}
  tableargs2 = {data: this.name, type: 'name'}
  displayTagResult = false
  tagExists = false

  displaySearchResult = false
  table_args_class_list = {data: this.searchResponse, type: this.type}

  getAllUserClasses(val:string){
    console.log("Searching for all class tags of user")
    axios.get(`/api/account/findUserCT`, { params: { prefix: val } })
      .then((res) => {
        //console.log(res.data[0])
        if (typeof res.data[0] === 'undefined'){
          this.searchResponse = ["No matching user"]
        } else {
          this.tabs = res.data[0].class_list;
          this.searchResponse = [res.data[0].class_list];
          //console.log(this.searchResponse)
        }
        this.type = 'search'
        this.displaySearchResult = true
        this.table_args_class_list = {data: this.searchResponse, type: this.type};
        //console.log(this.table_args_class_list)
      });
    console.log('tabs is'+ this.tabs);
  }

  getUserClasses(val: string) {
    console.log("searching class tags...")
    axios.get(`/api/account/searchClassTag`, { params: { prefix: val } })
      .then((res) => {
        console.log("seach tag")
        console.log(res.data[0])
        if (typeof res.data[0] === 'undefined'){
          this.searchResponse = ["No matching class tag"]
          this.name = ["No matching class name"]
          this.tagExists = false
          //console.log("no class");
        } else {
          this.searchResponse = [res.data[0].class_tag]
          this.name = [res.data[0].name]
          this.tagExists = true
          //console.log(this.name)
        }
        this.type = 'searchTagResult'
        this.displayTagResult = true
        this.tableargs = {data: this.searchResponse, type: this.type}
        this.tableargs2 = {data: this.name, type: this.type}
      })
    // .catch(error => {
    //   console.log(error.response)
    // });
  }

  onTabClick(event: any) {
    console.log(event.tab.textLabel);

  }

  addClass(val: string){
    console.log(this.tabs);
    this.getUserClasses(val);
    if(this.tagExists != false){
      this.tabs.push(val);
      console.log(this.tabs);
    }
    this.getAllUserClasses(val);
    console.log(val)
    axios.post('/api/account/joinClass', {
      user_name: this.curUser.user_name,
      data: val
    })
      .then((response) => {
        console.log(response);
      });
  }

  removeClass(index: number, val:string) {
    console.log(val)
    this.tabs.splice(index, 1);
    axios.post('/api/account/classRemove', {
      classes: val,
      userName: this.curUser.user_name
    })
      .then((response) => {
        console.log(response);
      });
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
  findClass(val: string) {
    console.log(val);
    axios.get(`/api/account/findClass`, { params: { prefix: val } })
      .then((res) => {
        console.log("class!")
        console.log(res.data[0]);
        alert('Class Name is '+res.data[0].name+'\n');
      });
  }

}
