import { Component, OnInit } from '@angular/core';
import {BackEndService, Feedback} from '../back-end.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[];

  constructor(private backEndService: BackEndService) { }

  ngOnInit(): void {
    this.backEndService.getFeedbacks().subscribe(
      res => {
        this.feedbacks = res.reverse();
      }
    );
  }

}
