import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorService {
  loaded = false;

  public loadingFinished: Subject<void> = new Subject<void>();

  constructor() {}

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
