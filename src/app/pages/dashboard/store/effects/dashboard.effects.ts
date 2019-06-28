import { Injectable } from '@angular/core';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { find } from 'lodash';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  first,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { State } from 'src/app/store/reducers';
import { getUrl } from 'src/app/store/selectors/router.selectors';
import { getCurrentUser } from 'src/app/store/selectors/user.selectors';

import { getCurrentDashboardId } from '../../helpers/get-current-dashboard-id.helper';
import { standardizeDashboards } from '../../helpers/standardize-dashboards.helper';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { addDashboardPreferences } from '../actions/dashboard-preferences.actions';
import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
  saveDashboard,
  setCurrentDashboard,
  updateDashboard,
  saveDashboardSuccess,
  saveDashboardFail,
  removeDashboard,
  removeDashboardSuccess,
  removeDashboardFail
} from '../actions/dashboard.actions';
import { getDashboardPreferences } from '../selectors/dashboard-preferences.selectors';

@Injectable()
export class DashboardEffects {
  addDashboardPreferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDashboardPreferences),
      map(({ dashboardPreferences }) =>
        loadDashboards({ dashboardPreferences })
      )
    )
  );

  loadDashboards$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadDashboards),
        concatMap(action =>
          of(action).pipe(withLatestFrom(this.store.pipe(select(getUrl))))
        ),
        switchMap(([{ dashboardPreferences }, routeUrl]) =>
          this.store.pipe(select(getCurrentUser)).pipe(
            first(currentUser => currentUser !== null),
            switchMap((currentUser: User) =>
              this.dashboardService.getAll(dashboardPreferences).pipe(
                tap((dashboards: Dashboard[]) => {
                  const standardizedDashboards: Dashboard[] = standardizeDashboards(
                    dashboards,
                    currentUser
                  );

                  const currentDashboard = find(standardizedDashboards, [
                    'id',
                    getCurrentDashboardId(routeUrl, dashboards, currentUser)
                  ]);
                  this.store.dispatch(
                    addDashboards({ dashboards: standardizedDashboards })
                  );
                  this.store.dispatch(
                    setCurrentDashboard({ dashboard: currentDashboard })
                  );
                }),
                catchError(error => {
                  this.store.dispatch(loadDashboardsFail({ error }));
                  return of(error);
                })
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  saveDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveDashboard),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(this.store.pipe(select(getDashboardPreferences)))
          )
        ),
        mergeMap(([{ dashboard, action }, dashboardPreferences]) =>
          this.dashboardService
            .save(dashboard, dashboardPreferences, action)
            .pipe(
              tap((dashboardResponse: Dashboard) => {
                // TODO: Add more attributes for notification
                this.store.dispatch(
                  saveDashboardSuccess({ dashboard: { ...dashboardResponse } })
                );
              }),
              catchError(error => {
                // TODO: Add more attributes for notification
                this.store.dispatch(
                  saveDashboardFail({ error, id: dashboard.id })
                );
                return of(error);
              })
            )
        )
      ),
    { dispatch: false }
  );

  removeDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeDashboard),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(this.store.pipe(select(getDashboardPreferences)))
          )
        ),
        mergeMap(([{ id }, dashboardPreferences]) =>
          this.dashboardService.delete(id, dashboardPreferences).pipe(
            tap(() => {
              this.store.dispatch(removeDashboardSuccess({ id }));
            }),
            catchError(error => {
              this.store.dispatch(removeDashboardFail({ error, id }));
              return of(error);
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
