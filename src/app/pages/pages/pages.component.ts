import { Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Params} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as _ from 'lodash';
import * as $ from 'jquery';
import {PageState, SinglePageState} from '../../store/pages/page.state';
import {AppState} from '../../store/app.reducers';
import {getPage, getScrollBar, getStatsSummary} from '../../store/pages/page.selectors';
import {HttpClientService} from '../../services/http-client.service';
import {TimerObservable} from 'rxjs-compat/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {LoadStatsSummaryAction, LoadTopScrollAction} from '../../store/pages/page.actions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, AfterViewInit {

  page$: Observable<PageState>;
  statsSummary$: Observable<SinglePageState>;
  topScrollBar$: Observable<SinglePageState>;
  pageToDisplay: string;
  topScrollBar: string;
  statisticsSummary: string;

  _htmlMarkupTopScrollBar: SafeHtml;
  _htmlMarkup: SafeHtml;
  _htmlMarkupstatisticsSummary: SafeHtml;
  hasScriptSet: boolean;
  hasHtmlSet: boolean;
  hasHtmlSetScrollBar: boolean;
  hasHtmlSetStatisticsSummary: boolean;
  timeOut: boolean;
  timerStatus: boolean;
  pageId: string;
  private subscription: Subscription;

  constructor(private store: Store<AppState>, private httpClientService: HttpClientService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private elementRef: ElementRef) {
    this.store.dispatch(new LoadTopScrollAction());
    this.store.dispatch(new LoadStatsSummaryAction());
    this.page$ = store.select(getPage);
    this.topScrollBar$ = store.select(getScrollBar);
    this.statsSummary$ = store.select(getStatsSummary);
    this.timeOut = false;
    this.timerStatus = true;
  }

  ngOnInit() {
    if (this.topScrollBar$) {
      this.topScrollBar$.subscribe((topScrollBar) => {
        if (topScrollBar) {
          this.topScrollBar = topScrollBar['pageContent'];
          try {
            this._htmlMarkupTopScrollBar = this.sanitizer.bypassSecurityTrustHtml(
              this.topScrollBar
            );
            this.hasHtmlSetScrollBar = true;
          } catch (e) {
            console.log(JSON.stringify(e));
          }
        }
      });
    }

    if (this.statsSummary$) {
      this.statsSummary$.subscribe((statsSummary) => {
        if (statsSummary) {
          this.statisticsSummary = statsSummary['pageContent'];
          try {
            this._htmlMarkupstatisticsSummary = this.sanitizer.bypassSecurityTrustHtml(
              this.statisticsSummary
            );
            this.hasHtmlSetStatisticsSummary = true;
          } catch (e) {
            console.log(JSON.stringify(e));
          }
        }
      });
    }

    this.hasScriptSet = false;
    this.hasHtmlSet = false;
    if (this.page$) {
      this.page$.subscribe((thePage) => {
        if (thePage) {
          thePage.pages.forEach((page) => {
            this.route.params.forEach((params: Params) => {
              if (page.id === params['id'] && page.category === 'leaf') {
                this.pageId = page.id;
                this.pageToDisplay = page.pageContent;
                try {
                  this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
                    this.pageToDisplay
                  );
                  this.hasHtmlSet = true;
                } catch (e) {
                  console.log(JSON.stringify(e));
                }
              } if (page.category === '' && page.id === params['id']) {
                // here get the statistics page or page with no header button
                this.pageToDisplay = page.pageContent;
                try {
                  this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
                    this.pageToDisplay
                  );
                  this.hasHtmlSet = true;
                } catch (e) {
                  console.log(JSON.stringify(e));
                }
              } else if (page.id === params['id']) {
                this.pageToDisplay = page.pageContent;
                try {
                  this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
                    this.pageToDisplay
                  );
                  this.hasHtmlSet = true;
                } catch (e) {
                  console.log(JSON.stringify(e));
                }
              }
            });
          });
        }
      });
    }
  }
  OnDestroy() {
  }

  ngAfterViewInit() {
    this.setScriptsOnHtmlContent(
      this.getScriptsContents(this.pageToDisplay)
    );
    this.setStylesOnHtmlContent(
      this.getStylesContents(this.pageToDisplay)
    );
  }

  getStylesContents(html) {
    const matchedScriptArray = html.match(
      /<style[^>]*>([\w|\W]*)<\/style>/im
    );
    return matchedScriptArray && matchedScriptArray.length > 0
      ? matchedScriptArray[0].replace(/(<([^>]+)>)/gi, ':separator:').split(':separator:').filter(content => content.length > 0)
      : [];
  }

  getScriptsContents(html) {
    const matchedScriptArray = html.match(
      /<script[^>]*>([\w|\W]*)<\/script>/im
    );
    if (matchedScriptArray.length > 1) {
      console.log('html test', matchedScriptArray);
      return matchedScriptArray;
    } else {
      return matchedScriptArray;
    }
  }

  setStylesOnHtmlContent(stylesContentsArray) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = stylesContentsArray.join('');
    this.elementRef.nativeElement.appendChild(style);
    this.hasScriptSet = true;
  }

  setScriptsOnHtmlContent(scriptsContentsArray) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // script.innerHTML = scriptsContentsArray[0];
    this.elementRef.nativeElement.appendChild(scriptsContentsArray[0]);
    this.hasScriptSet = true;
  }

  getScriptUrl(scriptsContents) {
    let url = '';
    if (scriptsContents && scriptsContents.split('<script').length > 0) {
      scriptsContents.split('<script').forEach((scriptsContent: any) => {
        if (scriptsContent !== '') {
          url = scriptsContent.split('src=')[1].split('>')[0];
        }
      });
    }
    return url;
  }
}
