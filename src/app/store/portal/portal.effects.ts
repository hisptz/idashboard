import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as portalActions from '../portal/portal.actions';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {DownloadsState, PortalConfigurationState, StatsSummaryState} from './portal.state';

@Injectable()
export class PortalEffects {
  @Effect()
  loadPortalConfiguration$ = this.actions$
    .ofType<portalActions.LoadPortalConfigurationAction>(portalActions.PortalActions.LOAD_PORTAL_CONFIGURATION)
    .pipe(
      switchMap(() => this._loadData('dataStore/observatory/portalConfigurations.json').pipe(
        map((portalConfigurationObj: PortalConfigurationState) =>
          new portalActions.LoadPortalConfigurationSuccessAction(portalConfigurationObj)),
        catchError((error) => of(new portalActions.LoadPortalConfigurationFailAction(error)))
      ))
    );

  @Effect()
  loadStatsSummary$ = this.actions$
    .ofType<portalActions.LoadStatsSummaryAction>(portalActions.PortalActions.LOAD_STATS_SUMMARY)
    .pipe(
      switchMap(() => this._loadData('dataStore/observatory/statsSummaryData.json').pipe(
        map((statsSummaryObj: StatsSummaryState) =>
          new portalActions.LoadStatsSummarySuccessAction(statsSummaryObj)),
        catchError((error) => of(new portalActions.LoadStatsSummaryFailAction(error)))
      ))
    );

  @Effect()
  loadDownloads$ = this.actions$
    .ofType<portalActions.LoadDownloadsAction>(portalActions.PortalActions.LOAD_DOWNLOADS)
    .pipe(
      switchMap(() => this._loadData('dataStore/observatory/downloadsDefinitions.json').pipe(
        map((downloadsObj: DownloadsState) =>
          new portalActions.LoadDownloadsSuccessAction(downloadsObj)),
        catchError((error) => of(new portalActions.LoadDownloadsFailAction(error)))
      ))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _loadData(url): Observable<any> {
    return this.httpClient.get(url);
  }
}
