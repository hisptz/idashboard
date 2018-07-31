import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as page from '../pages/page.actions';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {PageState} from './page.state';
import 'rxjs/add/operator/map';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PageEffects {

  @Effect()
  loadPage$ = this.actions$
    .ofType<page.LoadAction>(page.PageActions.LOAD)
    .pipe(
      switchMap(() => this._load().pipe(
        map((pageObject: PageState) =>
          new page.LoadSuccessAction(pageObject)),
        catchError((error) => of(new page.LoadFailAction(error)))
      ))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _load(): Observable<any> {
    return this.httpClient.get(`dataStore/observatory/pages.json`);
  }
}
