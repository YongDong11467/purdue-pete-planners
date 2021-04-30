import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displaySearchResult = false
  displayMealResult = false
  displayFriendResult = false
  displayFriendRequest = false
  displayTagResult = false
  displayUserClasses = false
  displayMemberRequest = false
  displayChatRoomRequest = false
  displayStudyRoomRequest = false
  displayAnnouncement = false
  displayComments = false
  displayBanResult = false
  displayStudyInvite = false
  displayedColumns: string[] = [''];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  curUser = JSON.parse(sessionStorage.curUser || '{}');
  bld = ''
  info = ''
  classes = [];
  i = 0;
  email = '';

  @Input() data:any;
  @Output() toFriendPage = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  closeResult = '';
  constructor(private modalService: NgbModal) {
    this.data = {}
    this.bld = ''
  }

  ngOnInit(): void {
    if (this.data.type === 'search') {
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult', 'sendfr'];
    } else if (this.data.type === 'friend') {
      this.displayFriendResult = true
      this.displayedColumns = ['friend','info'];
    } else if (this.data.type === 'searchTagResult') {
      this.displayTagResult = true
      this.displayedColumns = ['searchTagResult'];
    } else if (this.data.type === 'userClassResult') {
      this.displayUserClasses = true
      this.displayedColumns = ['userClassResult'];
    } else if (this.data.type === 'member') {
      this.displayMemberRequest = true
      this.displayedColumns = ['member'];
    } else if (this.data.type === 'chat_room') {
      this.displayChatRoomRequest = true
      this.displayedColumns = ['chat_room'];
    } else if (this.data.type === 'study_room') {
      this.displayStudyRoomRequest = true
      this.displayedColumns = ['study_room'];
    } else if (this.data.type === 'announcement') {
      this.displayAnnouncement = true
      this.displayedColumns = ['announcement'];
    } else if (this.data.type === 'Comments') {
      this.displayComments = true
      this.displayedColumns = ['Comments'];
    } else if (this.data.type === 'ban') {
      this.displayBanResult = true;
      this.displayedColumns = ['banResult', 'banstatus'];
    } else if (this.data.type === 'studyinvite') {
      this.displayStudyInvite = true;
      this.displayedColumns = ['studyinvite', 'sendstudyinv'];
    } else {
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.bld = this.data.type
    }
    this.dataSource = new MatTableDataSource(this.data.data);
    this.dataSource.paginator = this.paginator
    console.log(this.data.data)
  }

  ngOnChanges() {
    if (this.data.type === 'search') {
      this.displaySearchResult = true;
      this.displayedColumns = ['searchResult', 'sendfr'];
    } else if (this.data.type === 'friend') {
      this.displayFriendResult = true
      this.displayedColumns = ['friend','info'];
    } else if (this.data.type === 'friendrequest') {
      this.displayFriendRequest = true
      this.displayedColumns = ['friendrequest', 'accept', 'decline'];
    } else if (this.data.type === 'searchTagResult') {
      this.displayTagResult = true
      this.displayedColumns = ['searchTagResult'];
    } else if (this.data.type === 'userClassResult') {
      this.displayUserClasses = true
      this.displayedColumns = ['userClassResult'];
    } else if (this.data.type === 'member') {
      this.displayMemberRequest = true
      this.displayedColumns = ['member'];
    } else if (this.data.type === 'chat_room') {
      this.displayChatRoomRequest = true
      this.displayedColumns = ['chat_room'];
    } else if (this.data.type === 'study_room') {
      this.displayStudyRoomRequest = true
      this.displayedColumns = ['study_room'];
    } else if (this.data.type === 'announcement') {
      this.displayAnnouncement = true
      this.displayedColumns = ['announcement'];
    } else if (this.data.type === 'Comments') {
      this.displayComments = true
      this.displayedColumns = ['Comments'];
    } else if (this.data.type === 'ban') {
      this.displayBanResult = true;
      this.displayedColumns = ['banResult', 'banstatus'];
    } else if (this.data.type === 'studyinvite') {
      this.displayStudyInvite = true;
      this.displayedColumns = ['studyinvite', 'studygroup', 'sendstudyinv'];
    } else {
      this.displayMealResult = true;
      this.displayedColumns = ['mealResult'];
      this.bld = this.data.type
    }
    this.dataSource = new MatTableDataSource(this.data.data);
    console.log(this.data.data)
    this.dataSource.paginator = this.paginator
  }

  clickedFriendRequest(username: any) {
    console.log(username)
    axios.post("/api/account/sendfr", { curUser: this.curUser.user_name, data: username })
  }

  clickedFrinedInfo(username: any) {
    console.log("info!")
    console.log(username);

    axios.get(`/api/account/searchUsers`, {params: {prefix: username}})
      .then((res) => {
        console.log(res.data[0].email);
        this.info = "Contact Infomation: " + res.data[0].email+"\n";
        this.classes = res.data[0].class_list;
        this.info += "classes are ";
        if (this.classes.length == 0) {
          this.info += "none";
        }
        else {
          for (this.i = 0; this.i < this.classes.length; this.i++) {
            this.info += this.classes[this.i];
            this.info += "\n";
          }
        }
        alert(this.info);
      });
  }

  clickedAccept(username: any) {
    axios.post("/api/account/updateUserInfo", { curUser: this.curUser.user_name, data: username, type:"acceptfr" }).then(res =>
      this.toFriendPage.emit(username))
    console.log(username)
  }

  clickedDecline(username: any) {
    axios.post("/api/account/updateUserInfo", { curUser: this.curUser.user_name, data: username, type:"declinefr" }).then(res =>
      this.toFriendPage.emit(username))
    console.log(username)
  }

  clickedAddClass(username: any) {
    console.log(username)
    axios.post("/api/account/searchClassTag", { curUser: this.curUser.class_list, data:  username})
  }

  clickedBan(username: any) {
    console.log(username)
    if (username.banned == 'unban') {
      axios.post("/api/account/updateUserInfo", { curUser: this.curUser.user_name,
        data: {username: username.user_name, newbanstatus: "ban"}, type:"ban" })
    } else {
      axios.post("/api/account/updateUserInfo", { curUser: this.curUser.user_name,
        data: {username: username.user_name, newbanstatus: "unban"}, type:"ban" })
    }
  }

  clickedStudyRequest(username: any) {
    console.log(username)
    axios.post("/api/account/sendfr", { curUser: this.curUser.user_name, data: username })
  }
  open(content: any, username: any) {
    axios.get(`/api/account/searchUsers`, {params: {prefix: username}})
      .then((res) => {
        console.log(res.data[0].email);
        this.email = res.data[0].email;
        this.classes = res.data[0].class_list;
        if (this.classes.length == 0) {
          this.info += "none";
        }
        else {
          for (this.i = 0; this.i < this.classes.length; this.i++) {
            this.info += this.classes[this.i];
            this.info += "\n";
          }
        }
        //alert(this.info);
      });
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
  joinClass(val: string) {
    console.log(val)
    axios.post('/api/account/joinClass', {
      user_name: this.curUser.user_name,
      data: val
    })
      .then((response) => {
        console.log(response);
      });
  }
  /*addClass(val: string){
    this.getUserClasses(val);
    if(this.tagExists != false){
      this.tabs.push(val);
    }
    this.getAllUserClasses(val);
  }*/
}
