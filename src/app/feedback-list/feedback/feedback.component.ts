import {Component, Input, OnInit} from '@angular/core';
import {Feedback} from '../../back-end.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Input() feedback: Feedback;

  constructor() { }

  ngOnInit(): void {
  }

}
