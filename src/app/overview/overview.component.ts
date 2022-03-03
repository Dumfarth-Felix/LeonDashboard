import {Component, OnInit} from '@angular/core';
import {BackEndService} from '../back-end.service';
import {Observable} from 'rxjs';
import {count} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MonacoEditorService} from '../monaco-editor.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  codeNLU = '';
  codeStories = '';
  codeRules = '';
  codeDomain = '';
  constructor(private readonly monacoEditorService: MonacoEditorService, private readonly backend: BackEndService) {
    this.backend.getNLU().subscribe(res => {
      this.codeNLU = res;
    });
    this.backend.getStories().subscribe(res => {
      this.codeStories = res;
    });
    this.backend.getRules().subscribe(res => {
      this.codeRules = res;
    });
    this.backend.getDomain().subscribe(res => {
      this.codeDomain = res;
    });
  }
}
