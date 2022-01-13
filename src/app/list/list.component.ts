import { Component, OnInit } from '@angular/core';
import {BackEndService} from '../back-end.service';
import {DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: JSON;
  out: string;
  private startDate: Date;
  private endDate: Date;
  messPerS: Array<number>;
  messID: Array<string>;
  messages: Array<JSON>;
  tempMessIds: Array<string>;

  constructor(private backEndService: BackEndService) { }

  ngOnInit(): void {
    this.getConversations();
  }

  getConversations(): void {
    this.backEndService.getAllConversations().subscribe({
      next: res => {
        this.list = res;

        this.out = '';
        this.messPerS = [];
        this.messID = [];
        this.tempMessIds = [];
        // tslint:disable-next-line:forin
        for (const listKey in this.list) {
          this.messPerS.push(Number(this.list[listKey]));
          this.tempMessIds.push(listKey);
          this.out += listKey + ' ' + this.list[listKey] + ' <br>';
        }
        this.tempMessIds = this.tempMessIds.sort((a, b) => {
          return (new Date(Number(b.split('|')[1]) * 1000) as any) - (new Date(Number(a.split('|')[1]) * 1000) as any);
        });

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.tempMessIds.length; i++) {
          this.messID.push(this.tempMessIds[i].split('|')[0]);
        }
      },
      error: err => {
        console.log('Error: ' + err.error.error + '' + err.error.text);
      }
    });
  }

  onChangeEnd(event): void{
    if (event.value != null){
      this.endDate = event.value;
      const tempList = this.tempMessIds.filter(i => {
        return new Date(Number(i.split('|')[1]) * 1000) <= this.endDate && new Date(Number(i.split('|')[1]) * 1000) >= this.startDate;
      });
      tempList.sort((a, b) => {
        return (new Date(Number(b.split('|')[1]) * 1000) as any) - (new Date(Number(a.split('|')[1]) * 1000) as any);
      });
      this.messID = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < tempList.length; i++) {
        this.messID.push(tempList[i].split('|')[0]);
      }
    }
  }

  onChangeStart(event): void {
    if (event.value != null){
      this.startDate = event.value;
      const tempList = this.tempMessIds.filter(i => {
        return new Date(Number(i.split('|')[1]) * 1000) >= this.startDate;
      });
      tempList.sort((a, b) => {
        return (new Date(Number(b.split('|')[1]) * 1000) as any) - (new Date(Number(a.split('|')[1]) * 1000) as any);
      });
      this.messID = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < tempList.length; i++) {
        this.messID.push(tempList[i].split('|')[0]);
      }
    }
  }
}
