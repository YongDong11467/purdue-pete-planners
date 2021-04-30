import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import axios from 'axios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ClassComponent implements OnInit {
  closeResult = '';

  constructor(
    private modalService: NgbModal,     
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  tableargs1 = {data: [], type: 'List of Classes'};
  tabs: string[] = [];
  

  curUser = JSON.parse(sessionStorage.curUser || '{}');
  user = this.curUser.user_name;
  classes = this.curUser.classes;
  

  ngOnInit(): void {
      this.curUser = JSON.parse(sessionStorage.curUser || '{}');
      this.classes =this.curUser.classes;
      console.log(this.classes)
      console.log(this.classes.length);
      for(let i = 0; i <this.classes.length; i++){
          this.tabs.push(this.classes[i]);
      }

      console.log(this.curUser)
      console.log(this.curUser.user_name)
      // console.log(this.getAllUserClasses(this.curUser.user_name))
    
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

  // func for searching to add classes, returns if match
  getUserClasses(val: string) {
    console.log("searching class tags...")
    axios.get(`/api/account/searchClassTag`, { params: { prefix: val } })
    .then((res) => {
      console.log(res.data[0])
      if (typeof res.data[0] === 'undefined'){
        this.searchResponse = ["No matching class tag"]
        this.name = ["No matching class name"]
        this.tagExists = false
        console.log("no class");
      } else {
        this.searchResponse = [res.data[0].class_tag]
        this.name = [res.data[0].name]
        this.tagExists = true
        console.log(this.name)
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
    this.getUserClasses(val);
    if(this.tagExists != false){
      this.tabs.push(val);
      axios.post('/api/classes/classAdd', {
        "user_name": this.user,
        data : val,
      }).then((response) => {
        // this.userInfo();
        axios.get(`/api/account/searchUsers`, { params: { prefix: this.user } })
        .then((res) => {
          console.log(res.data[0])
          if (typeof res.data[0] === 'undefined'){
            console.log('No matching users')
          } else {
            sessionStorage.setItem('curUser', JSON.stringify(res.data[0]));
          }
        });
        this.router.navigate(['/class']);
      }).catch((error) => {
        console.log(error);
      });
  
    }

  
  }

  removeClass(index: number) {
    var toRemove = this.tabs[index];
    //console.log(toRemove);
    this.tabs.splice(index, 1);

    axios.post('/api/classes/classRemove', {
      "user_name": this.user,
      data : toRemove,
    }).then((response) => {
      axios.get(`/api/account/searchUsers`, { params: { prefix: this.user } })
      .then((res) => {
        console.log(res.data[0])
        if (typeof res.data[0] === 'undefined'){
          console.log('No matching users')
        } else {
          sessionStorage.setItem('curUser', JSON.stringify(res.data[0]));
        }
      });
      this.router.navigate(['/class']);
    }).catch((error) => {
      console.log(error);
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

}
