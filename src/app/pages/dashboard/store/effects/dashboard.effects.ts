import { Injectable } from '@angular/core';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
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
  setCurrentDashboard,
  addDashboard,
  createDashboard,
  initializeDashboardSave,
  updateDashboard
} from '../actions/dashboard.actions';
import { getDashboardPreferences } from '../selectors/dashboard-preferences.selectors';
import { LoadDataFilters } from '@iapps/ngx-dhis2-data-filter';
import { getNewDashboard } from '../../helpers/get-new-dashboard.helper';
import { getCurrentDashboard } from '../selectors/dashboard-selectors';
import { validateDashboard } from '../../helpers/validate-dashboard.helper';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';
import { camelCase, isPlainObject, omit } from 'lodash';
import { DashboardItem } from '../../models/dashboard-item.model';
import { saveFavorites } from '../../modules/ngx-dhis2-visualization/store/actions/favorite.actions';

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
              switchMap((currentUser: User) => {
                // load data filters
                this.store.dispatch(new LoadDataFilters(currentUser));
                return this.dashboardService
                  .getAll(dashboardPreferences, currentUser)
                  .pipe(
                    map((dashboards: Dashboard[]) =>
                      addDashboards({
                        dashboards,
                        currentUser
                      })
                    ),
                    catchError(error => of(loadDashboardsFail({ error })))
                  );
              })
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

  initializeDashboardSave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initializeDashboardSave),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(this.store.pipe(select(getCurrentDashboard)))
          )
        ),
        tap(([action, dashboard]) => {
          const saveAction = dashboard.id === 'new' ? 'CREATE' : 'UPDATE';

          const validDashboard = validateDashboard(dashboard);
          if (validDashboard.valid) {
            const originalId = dashboard.id;

            const newDashboard = {
              ...dashboard,
              id: saveAction === 'CREATE' ? generateUid() : dashboard.id
            };

            const favoriteDetails = dashboard.dashboardItems
              .map((dashboardItem: DashboardItem) => {
                const favoriteType = camelCase(dashboardItem.type);
                const favorite = dashboardItem[favoriteType];
                return isPlainObject(favorite)
                  ? { id: favorite.id, type: favoriteType }
                  : null;
              })
              .filter(favorite => favorite);

            this.store.dispatch(saveFavorites({ favoriteDetails, saveAction }));

            if (saveAction === 'CREATE') {
              this.store.dispatch(setCurrentDashboard({ id: newDashboard.id }));
            }
            this.store.dispatch(
              saveDashboard({
                dashboard: newDashboard,
                action: saveAction,
                originalId
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  saveDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveDashboard),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(getDashboardPreferences)))
        )
      ),
      mergeMap(([{ dashboard, action }, dashboardPreferences]) =>
        this.dashboardService
          .save(
            {
              ...dashboard,
              dashboardItems: (dashboard.dashboardItems || []).map(
                (dashboardItem: DashboardItem) =>
                  omit(dashboardItem, ['visualization'])
              )
            },
            dashboardPreferences,
            action
          )
          .pipe(
            map((dashboardResponse: Dashboard) => {
              return saveDashboardSuccess({
                dashboard: { ...dashboardResponse }
              });
            }),
            catchError(error =>
              of(saveDashboardFail({ error, id: dashboard.id }))
            )
          )
      )
    )
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

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createDashboard),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(getCurrentUser)),
            this.store.pipe(select(getDashboardPreferences))
          )
        )
      ),
      switchMap(([action, currentUser, { defaultDashboardItems }]) => {
        const dashboard: Dashboard = getNewDashboard(
          currentUser,
          defaultDashboardItems
        );
        return [
          addDashboard({
            dashboard
          }),
          setCurrentDashboard({ id: dashboard.id })
        ];
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
