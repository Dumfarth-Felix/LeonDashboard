import {Component, Input, OnInit} from '@angular/core';
import {BackEndService} from '../../back-end.service';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss']
})
export class ConversationItemComponent implements OnInit {

  message: JSON;
  showChat = false;
  messages = [];
  nOfMess: number = null;
  date = new Date();
  @Input() id: string;
  months = ['Jan', 'Feb', 'Mar',
    'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dez'];
  constructor(private backEndService: BackEndService) { }

  ngOnInit(): void {
    this.getConversation();
  }
  getConversation(): void {
    this.backEndService.getConversations(this.id).subscribe({
      next: res => {
        this.message = res;
        const map = new Map();
        for (const messageKey in this.message) {
          if (this.message.hasOwnProperty(messageKey)) {
            map.set(messageKey, this.message[messageKey]);
          }
        }
        this.date = new Date(Number(map.get('latest_event_time')) * 1000);
        // tslint:disable-next-line:forin
        for (const messagesKey in map.get('messages')) {
          const map2 = new Map();
          for (const messageKey2 in map.get('messages')[messagesKey]) {
            if (map.get('messages')[messagesKey].hasOwnProperty(messageKey2)) {
              map2.set(messageKey2, map.get('messages')[messagesKey][messageKey2]);
            }
          }
          this.addMessage(map2.get('type'), map2.get('text'), 'received', 'text');
        }
        this.nOfMess = this.messages.filter(i => {
          return i.from !== 'bot';
        }).length;
      }
    });
  }

  public addMessage(from, text, type: 'received' | 'sent', messageType): void {
    this.messages.push({from, text, messageType});
  }

  showHideChat(): void {
    this.showChat = !this.showChat;
  }
}
