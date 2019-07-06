import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { camelCase, isPlainObject } from 'lodash';
import { of } from 'rxjs';
import { catchError, take, tap, mergeMap } from 'rxjs/operators';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import { DashboardItemService } from '../../services/dashboard-item.service';
import {
  addDashboardItem,
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
            tap((dashboardItemResponse: DashboardItem) => {
              this.store.dispatch(
                addDashboardItem({ dashboardItem: dashboardItemResponse })
              );
            }),
            catchError(error => {
              this.store.dispatch(
                loadDashboardItemFail({ error, id: dashboardItem.id })
              );
              return of(error);
            })
          )
      )
    )
  );

  addDashboardItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addDashboardItem),
        tap(({ dashboardItem }) => {
          const favoriteType = camelCase(dashboardItem.type);
          const favorite = dashboardItem[favoriteType];

          if (isPlainObject(favorite)) {
            this.store.dispatch(
              loadFavorite({
                favoriteId: favorite.id,
                favoriteType: favoriteType,
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
