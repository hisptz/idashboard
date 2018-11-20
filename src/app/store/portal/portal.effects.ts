import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as portalActions from '../portal/portal.actions';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {DownloadsState, PortalConfigurationState, StatsSummaryState, FAQState, ExternalSourcesState} from './portal.state';
import * as dashboard from '../dashboard/dashboard.actions';

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

  // START: FAQ EFFECTS

  @Effect()
  loadFAQS$ = this.actions$
    .ofType<portalActions.LoadFAQAction>(portalActions.PortalActions.LOAD_FAQ)
    .pipe(
      switchMap(() => this._loadData('dataStore/observatory/faqSection.json').pipe(
        map((faqStateObject: FAQState) =>
          new portalActions.LoadFAQSuccessAction(faqStateObject)),
        catchError((error) => of(new portalActions.LoadFAQFailAction(error)))
      ))
    );

  // ENDS: FAQ EFFECTS

  @Effect()
  dataFromExternalSource$ = this.actions$
    .ofType<portalActions.LoadExtractedDataFromExternalSourcesAction>(portalActions.PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE)
    .pipe(
      switchMap((action: any) => this._loadData(action.payload).pipe(
        map((dataObject: ExternalSourcesState) =>
        new portalActions.LoadExtractedDataFromExternalSourcesSuccessAction(dataObject))
      ))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _loadData(url): Observable<any> {
    console.log('load data url', url);
    return this.httpClient.get(url);
  }
}
