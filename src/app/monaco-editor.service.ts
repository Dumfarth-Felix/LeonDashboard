import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorService {
  loaded = false;
  addedLang = false;
  codeNLU = '';

  public loadingFinished: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  private finishLoading(): void {
    this.loaded = true;
    this.loadingFinished.next();
  }

  public load(): void {
    // load the assets

    const baseUrl = './assets' + '/monaco-editor/min/vs';

    if (typeof (window as any).monaco === 'object') {
      this.finishLoading();
      return;
    }

    const onGotAmdLoader: any = () => {
      // load Monaco
      (window as any).require.config({ paths: { vs: `${baseUrl}` } });
      (window as any).require([`vs/editor/editor.main`], () => {
        this.finishLoading();
      });
    };

    // load AMD loader, if necessary
    if (!(window as any).require) {
      const loaderScript: HTMLScriptElement = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = `${baseUrl}/loader.js`;
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }
}
