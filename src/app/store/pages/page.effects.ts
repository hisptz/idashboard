import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as page from '../pages/page.actions';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {PageState, SinglePageState} from './page.state';
import 'rxjs/add/operator/map';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PageEffects {

  @Effect()
  loadPage$ = this.actions$
    .ofType<page.LoadAction>(page.PageActions.LOAD)
    .pipe(
      switchMap(() => this._loadPages().pipe(
        map((pageObject: PageState) =>
          new page.LoadSuccessAction(pageObject)),
        catchError((error) => of(new page.LoadFailAction(error)))
      ))
    );

  @Effect()
  loadHomeScrollBar$ = this.actions$
    .ofType<page.LoadAction>(page.PageActions.LOAD)
    .pipe(
      switchMap(() => this._loadHomeScrollBar().pipe(
        map((pageObject: SinglePageState) =>
          new page.LoadTopScrollSuccessAction(pageObject)),
        catchError((error) => of(new page.LoadTopScrollFailAction(error)))
      ))
    );

  @Effect()
  loadFAQSandHelp$ = this.actions$
    .ofType<page.LoadAction>(page.PageActions.LOAD_FAQS)
    .pipe(
      switchMap(() => this._loadFAQSandHelp().pipe(
        map((pageObject: SinglePageState) =>
          new page.LoadFAQSHelpSuccessAction(pageObject)),
        catchError((error) => of(new page.LoadFAQSHelpFailAction(error)))
      ))
    )

  @Effect()
  loadStatisticsSummary$ = this.actions$
    .ofType<page.LoadAction>(page.PageActions.LOAD_STATS_SUMMARY)
    .pipe(
      switchMap(() => this._loadStatisticsSummary().pipe(
        map((pageObj: SinglePageState) =>
        new page.LoadStatsSummarySuccessAction(pageObj)),
        catchError((error) => of(new page.LoadStatsSummaryFailAction(error)))
      ))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _loadPages(): Observable<any> {
    return this.httpClient.get(`dataStore/observatory/pages.json`);
  }

  private _loadHomeScrollBar(): Observable<any> {
    return this.httpClient.get(`dataStore/observatoryContents/homeTopScrollbar.json`);
  }

  private _loadFAQSandHelp(): Observable<any> {
    return this.httpClient.get(`dataStore/observatoryContents/help-faqs.json`);
  }

  private _loadStatisticsSummary(): Observable<any> {
    return this.httpClient.get(`dataStore/observatoryContents/statisticsSummary.json`);
  }
}
