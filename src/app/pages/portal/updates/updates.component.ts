import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {ActivatedRoute, Params} from '@angular/router';
import {StatsSummaryState} from '../../../store/portal/portal.state';
import {Observable} from 'rxjs/index';
import {getStatsSummary} from '../../../store/portal/portal.selectors';
import * as portalActions from '../../../store/portal/portal.actions';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {

  statsSummary$: Observable<StatsSummaryState>;
  allNews: any;
  news: any;
  hasScriptSet: boolean;
  hasHtmlSet: boolean;
  _newsFromExternalSource: SafeHtml;
  constructor(private store: Store<AppState>, private httpClient: HttpClient, private route: ActivatedRoute, private sanitizer: DomSanitizer, private elementRef: ElementRef) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    this.statsSummary$ = store.select(getStatsSummary);
  }

  ngOnInit() {
    if (this.statsSummary$) {
      this.statsSummary$.subscribe((summaryInfo) => {
        if (summaryInfo) {
          this.allNews = summaryInfo['news'];
          this.route.params.forEach((params: Params) => {
            if (params['id']) {
              this.allNews.forEach((news) => {
                if (news.id === params['id']) {
                  this.news = news;
                }
              });
            }
          });
        }
      });
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/text',
      })
    }
    this.httpClient.get('../../../dhis/extract', httpOptions).subscribe((data) => {
      console.log(data);
      try {
        this._newsFromExternalSource = this.sanitizer.bypassSecurityTrustHtml(
          data['data']
        );
        this.hasScriptSet = true;
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    });
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
