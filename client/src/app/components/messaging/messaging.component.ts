import { Component, OnInit, Directive, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { messagingService } from '../../messaging.service';

const SOCKET_ENDPOINT = 'localhost:3080';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    messageService: messagingService
  ) { }

  chats: any;
  curUser: any;
  selectedChat?: any;

  getUserChats(){
    this.curUser = JSON.parse(sessionStorage.curUser || '{}');
    console.log(this.curUser);
    this.chats = this.curUser.chats;
    console.log(this.chats);
  }

  ngOnInit(): void { 
      this.getUserChats();
  }

  onSelect(chat: any): void {
    this.selectedChat = chat;
    console.log(this.selectedChat);
    axios.get('/api/messaging/chatHistory', { params: { prefix: chat } })
    .then((res) => {
        console.log(res);
    });
  }

}
