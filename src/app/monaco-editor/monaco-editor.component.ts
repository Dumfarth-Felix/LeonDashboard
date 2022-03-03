import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MonacoEditorService} from '../monaco-editor.service';
import {first} from 'rxjs/operators';

declare var monaco: any;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements OnInit {
  public editor: any;

  constructor(private readonly monacoEditorService: MonacoEditorService) {
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
    console.log(monaco.languages.getLanguages().find(({ id }) => id === 'yaml'));
    monaco.languages.register({ id: 'rasa' });

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
        return { suggestions };
      }
    });

    const wrapper = document.getElementById('root');
    this.editor = monaco.editor.create(
      this.editorContainer.nativeElement,
      {
        value: 'version: "2.0"\n' +
          'nlu:\n' +
          '- intent: greet\n' +
          '  examples: |\n' +
          '    - Grüß Gott!\n' +
          '    - Guten Tag!\n' +
          '    - Guten Tag bot\n' +
          '    - Guten Tag lieber bot\n' +
          '    - Hallo.',
        language:  'rasa',
        automaticLayout: true
      }
    );
  }
}
