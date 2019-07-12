import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { camelCase, isPlainObject } from 'lodash';
import { of } from 'rxjs';
import { catchError, take, tap, mergeMap, map } from 'rxjs/operators';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import { DashboardItemService } from '../../services/dashboard-item.service';
import {
  updateDashboardItem,
  initializeDashboardItem,
  loadDashboardItem,
  loadDashboardItemFail
} from '../actions/dashboard-item.actions';
import { loadFavorite } from '../actions/favorite.actions';
import { getDashboardItemById } from '../selectors/dashboard-item.selectors';

@Injectable()
export class DashboardItemEffects {
  initializeDashboardItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initializeDashboardItem),
        tap(({ dashboardItem }) => {
          this.store
            .pipe(select(getDashboardItemById(dashboardItem.id)))
            .pipe(take(1))
            .subscribe((storeDashboardItem: DashboardItem) => {
              if (!storeDashboardItem) {
                this.store.dispatch(loadDashboardItem({ dashboardItem }));
              }
            });
        })
      ),
    { dispatch: false }
  );

  loadDashboardItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardItem),
      mergeMap(({ dashboardItem }) =>
        this.dashboardItemService
          .getOne(dashboardItem.id, dashboardItem.type)
          .pipe(
            map((dashboardItemResponse: DashboardItem) =>
              updateDashboardItem({
                dashboardItem: dashboardItemResponse
              })
            ),
            catchError(error =>
              of(loadDashboardItemFail({ error, id: dashboardItem.id }))
            )
          )
      )
    )
  );

  updateDashboardItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDashboardItem),
        tap(({ dashboardItem }) => {
          const favoriteType = camelCase(dashboardItem.type);
          const favorite = dashboardItem[favoriteType];

          if (isPlainObject(favorite)) {
            this.store.dispatch(
              loadFavorite({
                favorite,
                favoriteType,
                dashboardItemId: dashboardItem.id
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardItemService: DashboardItemService
  ) {}
}
