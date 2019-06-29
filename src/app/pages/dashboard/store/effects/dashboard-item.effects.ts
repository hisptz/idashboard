import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  initializeDashboardItems,
  loadDashboardItem,
  addDashboardItem,
  loadDashboardItemFail
} from '../actions/dashboard-item.actions';
import {
  concatMap,
  withLatestFrom,
  tap,
  map,
  catchError
} from 'rxjs/operators';
import { of } from 'rxjs';
import { getDashboardItems } from '../selectors/dashboard-item.selectors';
import { DashboardItem } from '../../models/dashboard-item.model';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { find, camelCase, isPlainObject } from 'lodash';
import { loadFavorite } from '../actions/favorite.actions';
import { DashboardItemService } from '../../services/dashboard-item.service';

@Injectable()
export class DashboardItemEffects {
  initializeDashboardItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initializeDashboardItems),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(this.store.pipe(select(getDashboardItems)))
          )
        ),
        tap(([{ dashboardItems }, allDashboardItems]) => {
          (dashboardItems || [])
            .filter(
              (dashboardItem: DashboardItem) =>
                !find(allDashboardItems, ['id', dashboardItem.id])
            )
            .forEach((dashboardItem: DashboardItem) => {
              this.store.dispatch(loadDashboardItem({ dashboardItem }));
            });
        })
      ),
    { dispatch: false }
  );

  loadDashboardItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardItem),
      tap(({ dashboardItem }) => {
        if (dashboardItem) {
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
            );
        }
      })
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
