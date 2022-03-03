import { Component, OnInit } from '@angular/core';
import {BackEndService} from '../../back-end.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  list: JSON;
  out: string;
  messPerS: Array<number>;
  avg: string;
  count: number;
  sum: number;

  constructor(private backEndService: BackEndService, private readonly router: Router) {
    if (!backEndService.signedIn) {
      router.navigate(['signIn']);
    }
  }

  ngOnInit(): void {
    this.getConversations();
  }


  getConversations(): void {
    this.backEndService.getAllConversations().subscribe({
      next: res => {
        this.list = res;

        this.out = '';
        this.messPerS = [];
        this.count = 0;
        // tslint:disable-next-line:forin
        for (const listKey in this.list) {
          this.messPerS.push(Number(this.list[listKey]));
          this.count++;
          this.out += listKey + ' ' + this.list[listKey] + ' <br>';
        }
        this.sum = 0;
        this.messPerS.forEach(i => {
          this.sum += i;
        });
        this.avg = (this.sum / this.messPerS.length).toFixed(2).replace('.', ',');
      },
      error: err => {
        console.log('Error: ' + err.error.error + '' + err.error.text);
      }
    });
  }


}
