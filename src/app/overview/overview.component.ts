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
  codeNLU: string = null;
  codeStories: string = null;
  codeRules: string = null;
  codeDomain: string = null;
  constructor(private readonly monacoEditorService: MonacoEditorService, private readonly backend: BackEndService) {
    this.backend.getNLU().subscribe(res => {
      this.codeNLU = res;
      console.log('NLU: ' + res.length);
    });
    this.backend.getStories().subscribe(res => {
      this.codeStories = res;
      console.log('Story: ' + res.length);
    });
    this.backend.getRules().subscribe(res => {
      this.codeRules = res;
      console.log('Rules: ' + res.length);
    });
    this.backend.getDomain().subscribe(res => {
      this.codeDomain = res;
      console.log('Domain: ' + res.length);
    });
  }
}
