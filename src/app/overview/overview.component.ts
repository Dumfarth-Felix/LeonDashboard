import {Component, OnInit} from '@angular/core';
import {BackEndService} from '../back-end.service';
import {Observable} from 'rxjs';
import {count} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
}
