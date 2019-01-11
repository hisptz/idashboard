import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { HttpClientService } from "../../services/http-client.service";
import * as portalActions from "../portal/portal.actions";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import * as portalHelpers from "./helpers/index";
import "rxjs/add/operator/map";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import {
  DownloadsState,
  PortalConfigurationState,
  StatsSummaryState,
  FAQState,
  GroupedSlidersState,
  FeedBacksState,
  PortalViewsState
} from "./portal.state";
import { AppState } from "../app.reducers";
import { Store } from "@ngrx/store";
import { forkJoin } from "rxjs/index";
import * as _ from "lodash";

@Injectable()
export class PortalEffects {
  @Effect()
  loadPortalConfiguration$ = this.actions$
    .ofType<portalActions.LoadPortalConfigurationAction>(
      portalActions.PortalActions.LOAD_PORTAL_CONFIGURATION
    )
    .pipe(
      switchMap(() =>
        this._loadData("dataStore/observatory/portalConfigurations.json").pipe(
          map(
            (portalConfigurationObj: PortalConfigurationState) =>
              new portalActions.LoadPortalConfigurationSuccessAction(
                portalConfigurationObj
              )
          ),
          catchError(error =>
            of(new portalActions.LoadPortalConfigurationFailAction(error))
          )
        )
      )
    );

  @Effect()
  loadStatsSummary$ = this.actions$
    .ofType<portalActions.LoadStatsSummaryAction>(
      portalActions.PortalActions.LOAD_STATS_SUMMARY
    )
    .pipe(
      switchMap(() =>
        this._loadData("dataStore/observatory/statsSummaryData.json").pipe(
          map(
            (statsSummaryObj: StatsSummaryState) =>
              new portalActions.LoadStatsSummarySuccessAction(statsSummaryObj)
          ),
          catchError(error =>
            of(new portalActions.LoadStatsSummaryFailAction(error))
          )
        )
      )
    );

  @Effect()
  loadDownloads$ = this.actions$
    .ofType<portalActions.LoadDownloadsAction>(
      portalActions.PortalActions.LOAD_DOWNLOADS
    )
    .pipe(
      switchMap(() =>
        this._loadData("dataStore/observatory/downloadsDefinitions.json").pipe(
          map(
            (downloadsObj: DownloadsState) =>
              new portalActions.LoadDownloadsSuccessAction(downloadsObj)
          ),
          catchError(error =>
            of(new portalActions.LoadDownloadsFailAction(error))
          )
        )
      )
    );

  @Effect()
  loadGroupedSlidersInfo$ = this.actions$
    .ofType<portalActions.LoadGroupedSliderDataAction>(
      portalActions.PortalActions.LOAD_GROUPED_SLIDER_DATA
    )
    .pipe(
      switchMap(() =>
        this._loadData("dataStore/observatory/groupedSliderInfo.json").pipe(
          map(
            (groupedSlidersInfoObj: GroupedSlidersState) =>
              new portalActions.LoadGroupedSliderDataSuccessAction(
                groupedSlidersInfoObj
              )
          ),
          catchError(error =>
            of(new portalActions.LoadGroupedSliderDataFailAction(error))
          )
        )
      )
    );

  // START: FAQ EFFECTS

  @Effect()
  loadFAQS$ = this.actions$
    .ofType<portalActions.LoadFAQAction>(portalActions.PortalActions.LOAD_FAQ)
    .pipe(
      switchMap(() =>
        this._loadData("dataStore/observatory/faqSection.json").pipe(
          map(
            (faqStateObject: FAQState) =>
              new portalActions.LoadFAQSuccessAction(faqStateObject)
          ),
          catchError(error => of(new portalActions.LoadFAQFailAction(error)))
        )
      )
    );

  // ENDS: FAQ EFFECTS

  // Effect for Data from external source (extracted by the middleware)
  @Effect()
  dataFromExternalSource$ = this.actions$
    .ofType<portalActions.LoadExtractedDataFromExternalSourcesAction>(
      portalActions.PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE
    )
    .pipe(
      switchMap((action: any) =>
        this._loadData(action.payload).pipe(
          map(
            (dataObject: any) =>
              new portalActions.LoadExtractedDataFromExternalSourcesSuccessAction(
                dataObject
              )
          ),
          catchError(error =>
            of(
              new portalActions.LoadExtractedDataFromExternalSourcesFailAction(
                error
              )
            )
          )
        )
      )
    );

  // Effect for data analytics
  @Effect()
  dataAnalytics$ = this.actions$
    .ofType(portalActions.PortalActions.LOAD_DATA)
    .pipe(
      // tap((action: any) => {
      // console.log('payload', action.payload);
      //   const data$ = this._analyticsData(action.payload);
      //   if (data$) {
      //     data$.subscribe((data) => {
      //       console.log(JSON.stringify(data));
      //     });
      //   }
      //   this.store.dispatch(new portalActions.LoadDataSuccessAction({'id': 'jose', 'name': 'Josephat'}));
      // })
      switchMap((action: any) =>
        this._analyticsData(action.payload).pipe(
          map(
            (analyticsObj: any) =>
              new portalActions.LoadDataSuccessAction(analyticsObj)
          )
        )
      )
    );

  @Effect()
  loadFeedBacks$ = this.actions$
    .ofType<portalActions.LoadFeedbacksAction>(
      portalActions.PortalActions.LOAD_FEEDBACKS
    )
    .pipe(
      switchMap(() =>
        this.httpClient.get("dataStore/observatory/faqs.json").pipe(
          map(
            (feedBackObject: FeedBacksState) =>
              new portalActions.LoadFeedbacksSuccessAction(feedBackObject)
          ),
          catchError(error =>
            of(new portalActions.LoadFeedbacksFailAction(error))
          )
        )
      )
    );

  @Effect()
  loadPortalViews$ = this.actions$
    .ofType<portalActions.LoadPortalViewsAction>(
      portalActions.PortalActions.LOAD_PORTAL_VIEWS
    )
    .pipe(
      switchMap(() =>
        this.httpClient.get("dataStore/observatory/portalViews").pipe(
          map(
            (portalViewsObject: PortalViewsState) =>
              new portalActions.LoadPortalViewsSuccessAction(portalViewsObject)
          ),
          catchError(error =>
            of(new portalActions.LoadPortalViewsFailAction(error))
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private httpClient: HttpClientService
  ) {}

  private _loadData(url): Observable<any> {
    return this.httpClient.get(url);
  }

  private _analyticsData(url) {
    return new Observable(observer => {
      this.httpClient.get(url).subscribe(
        (dataDimensions: any[]) => {
          forkJoin(
            _.map(dataDimensions["dimensions"], (dataDimension: any) =>
              this.httpClient.get(
                "../api/analytics.json?dimension=dx:" +
                  dataDimension["indicatorId"] +
                  "&dimension=pe:" +
                  dataDimension["period"] +
                  "&filter=ou:" +
                  dataDimension["orgUnitId"] +
                  "&displayProperty=NAME&skipMeta=false"
              )
            )
          ).subscribe(
            (analyticsResults: any) => {
              observer.next(
                _.map(
                  analyticsResults,
                  (analyticsResult: any, analyticsResultIndex: number) => {
                    const addedIdentifier = "P";
                    if (analyticsResults) {
                    }
                    return {
                      id:
                        analyticsResults[analyticsResultIndex]["metaData"][
                          "dimensions"
                        ]["dx"][0] + addedIdentifier,
                      ...portalHelpers.formatAnalyticsResult(analyticsResult)
                    };
                  }
                )
              );
            },
            error => observer.error(error)
          );
        },
        error => observer.error(error)
      );
    });
  }
}
