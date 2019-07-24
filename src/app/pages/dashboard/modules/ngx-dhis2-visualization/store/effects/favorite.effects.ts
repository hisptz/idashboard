import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
  tap,
  take
} from 'rxjs/operators';
import { ErrorMessage } from 'src/app/core';
import { State } from 'src/app/store/reducers';

import { FavoriteService } from '../../services/favorite.service';
import { getDashboardPreferences } from '../../../../store/selectors/dashboard-preferences.selectors';
import { Favorite } from '../../models/favorite.model';
import {
  loadFavorite,
  loadFavoriteFail,
  updateFavorite,
  saveFavorites,
  saveFavorite
} from '../actions/favorite.actions';
import { getFavoritesByIds } from '../selectors/favorite.selectors';
import { find, omit } from 'lodash';

@Injectable()
export class FavoriteEffects {
  loadfavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavorite),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(getDashboardPreferences)))
        )
      ),
      mergeMap(
        ([
          {
            favorite,
            favoriteType,
            isNew,
            systemInfo,
            currentUser,
            visualizationId,
            visualizationType
          },
          dashboardPreferences
        ]) =>
          this.favoriteService
            .get({
              id: favorite.id,
              type: favoriteType,
              dashboardPreferences,
              systemInfo,
              currentUser,
              isNew
            })
            .pipe(
              map((favoriteResponse: Favorite) =>
                updateFavorite({
                  favorite: favoriteResponse,
                  visualizationId,
                  visualizationType,
                  systemInfo
                })
              ),
              catchError((error: ErrorMessage) =>
                of(
                  loadFavoriteFail({ error, id: favorite.id, visualizationId })
                )
              )
            )
      )
    )
  );

  saveFavorites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveFavorites),
        tap(({ favoriteDetails, saveAction }) => {
          const favoriteIds = favoriteDetails.map(
            (favoriteDetail: any) => favoriteDetail.id
          );
          this.store
            .pipe(select(getFavoritesByIds(favoriteIds)))
            .pipe(take(1))
            .subscribe((favorites: Favorite[]) => {
              favorites.forEach((favorite: Favorite) => {
                const favoriteDetail = find(favoriteDetails, [
                  'id',
                  favorite.id
                ]);
                this.store.dispatch(
                  saveFavorite({
                    favorite,
                    favoriteType: favoriteDetail ? favoriteDetail.type : '',
                    saveAction
                  })
                );
              });
            });
        })
      ),
    { dispatch: false }
  );

  saveFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveFavorite),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(this.store.pipe(select(getDashboardPreferences)))
          )
        ),
        tap(
          ([{ favorite, favoriteType, saveAction }, dashboardPreferences]) => {
            this.favoriteService
              .save(
                omit(favorite, ['notification']),
                dashboardPreferences,
                favoriteType,
                saveAction
              )
              .subscribe();
          }
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private favoriteService: FavoriteService
  ) {}
}
