import { Injectable } from '@angular/core';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom,
  first
} from 'rxjs/operators';
import { go } from 'src/app/store/actions';
import { State } from 'src/app/store/reducers';
import { getUrl } from 'src/app/store/selectors/router.selectors';
import {
  getCurrentUser,
  getCurrentUserLoaded
} from 'src/app/store/selectors/user.selectors';

import { getCurrentDashboardId } from '../../helpers/get-current-dashboard-id.helper';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { initializeDashboardItem } from '../actions/dashboard-item.actions';
import { addDashboardPreferences } from '../actions/dashboard-preferences.actions';
import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
  removeDashboard,
  removeDashboardFail,
  removeDashboardSuccess,
  saveDashboard,
  saveDashboardFail,
  saveDashboardSuccess,
  setCurrentDashboard
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

  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboards),
      switchMap(({ dashboardPreferences }) =>
        this.store.select(getCurrentUserLoaded).pipe(
          first(currentUserLoaded => currentUserLoaded),
          switchMap(() =>
            this.store.select(getCurrentUser).pipe(
              switchMap((currentUser: User) =>
                this.dashboardService
                  .getAll(dashboardPreferences, currentUser)
                  .pipe(
                    map((dashboards: Dashboard[]) =>
                      addDashboards({
                        dashboards,
                        currentUser
                      })
                    ),
                    catchError(error => of(loadDashboardsFail({ error })))
                  )
              )
            )
          )
        )
      )
    )
  );

  addDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDashboards),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(getUrl))))
      ),
      map(([{ dashboards, currentUser }, routeUrl]) => {
        const id = getCurrentDashboardId(routeUrl, dashboards, currentUser);
        return setCurrentDashboard({
          id
        });
      })
    )
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
              map((dashboardResponse: Dashboard) =>
                saveDashboardSuccess({ dashboard: { ...dashboardResponse } })
              ),
              catchError(error =>
                of(saveDashboardFail({ error, id: dashboard.id }))
              )
            )
        )
      ),
    { dispatch: false }
  );

  removeDashboard$ = createEffect(() =>
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
    )
  );

  setCurrentDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentDashboard),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(getCurrentUser))))
      ),
      map(([{ id }, { userCredentials }]) => {
        if (userCredentials && userCredentials.username && id) {
          localStorage.setItem(
            'dhis2.dashboard.current.' + userCredentials.username,
            id
          );
        }

        return go({ path: [`/dashboards/${id}`] });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
