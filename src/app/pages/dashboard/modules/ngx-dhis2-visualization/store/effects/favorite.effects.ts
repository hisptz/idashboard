import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import { ErrorMessage } from 'src/app/core';
import { State } from 'src/app/store/reducers';

import { FavoriteService } from '../../services/favorite.service';
import { getDashboardPreferences } from '../../../../store/selectors/dashboard-preferences.selectors';
import { Favorite } from '../../models/favorite.model';
import {
  loadFavorite,
  loadFavoriteFail,
  updateFavorite
} from '../actions/favorite.actions';

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
                  visualizationType
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

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private favoriteService: FavoriteService
  ) {}
}
