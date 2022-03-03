import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MonacoEditorService} from '../monaco-editor.service';
import {first} from 'rxjs/operators';
import {BackEndService} from '../back-end.service';


declare var monaco: any;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements OnInit {
  public editor: any;
  saved = true;
  @Input() code: string;
  @Input() file: string;

  constructor(private readonly monacoEditorService: MonacoEditorService, private readonly backend: BackEndService) {
  }

  @ViewChild('editorContainer', {static: true}) editorContainer: ElementRef | null = null;

  ngOnInit(): void {
    this.monacoEditorService.load();
    if (!this.monacoEditorService.loaded) {
      this.monacoEditorService.loadingFinished.pipe(first()).subscribe(() => {
        this.ngOnInit();
      });
      return;
    }

    // @ts-ignore
    // console.log(monaco.languages.getLanguages().find(({ id }) => id === 'yaml'));
    if (!this.monacoEditorService.addedLang) {
      monaco.languages.register({id: 'rasa'});

// Register a completion item provider for the new language
      monaco.languages.registerCompletionItemProvider('rasa', {
        provideCompletionItems: () => {
          const suggestions = [
            {
              label: 'intent',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '- intent: ${1:name}\n' +
                '  examples: |\n' +
                '    - ',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
              label: 'nlu',
              kind: monaco.languages.CompletionItemKind.Text,
              insertText: 'version: "2.0"\n' +
                'nlu:'
            },
            {
              label: 'story',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '  - story: ${1:name}\n' +
                '    steps:\n' +
                '      - intent: ${2}\n' +
                '      - action: ',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
              label: 'stories',
              kind: monaco.languages.CompletionItemKind.Text,
              insertText: 'version: "2.0"\n' +
                'stories:\n'
            }
          ];
          return {suggestions};
        }
      });
      this.monacoEditorService.addedLang = true;
    }

    const wrapper = document.getElementById('root');
    this.editor = monaco.editor.create(
      this.editorContainer.nativeElement,
      {
        value: this.code,
        language: 'rasa',
        automaticLayout: true
      }
    );
    this.editor.onDidChangeModelContent(i => {
        console.log('change');
        if (this.saved) {
          this.changeSave();
        }
      }
    );
  }

  changeSave(): void {
    this.saved = !this.saved;
  }

  save(): void {
    this.changeSave();
    switch (this.file) {
      case 'nlu':
        this.backend.putNLU(this.editor.getValue());
        break;
      case 'stories':
        this.backend.putStories(this.editor.getValue());
        break;
      case 'rules':
        this.backend.putRules(this.editor.getValue());
        break;
      case 'domain':
        this.backend.putDomain(this.editor.getValue());
        break;
    }
  }
}
