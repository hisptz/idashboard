import { Injectable } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadFavorite,
  updateFavorite,
  loadFavoriteFail
} from '../actions/favorite.actions';
import {
  concatMap,
  withLatestFrom,
  mergeMap,
  map,
  catchError
} from 'rxjs/operators';
import { of } from 'rxjs';
import { getDashboardPreferences } from '../selectors/dashboard-preferences.selectors';
import { FavoriteService } from '../../services/favorite.service';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { Favorite } from '../../models/favorite.model';
import { ErrorMessage } from 'src/app/core';

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
      mergeMap(([{ favorite, favoriteType }, dashboardPreferences]) =>
        this.favoriteService
          .get(favorite.id, favoriteType, dashboardPreferences)
          .pipe(
            map((favoriteResponse: Favorite) =>
              updateFavorite({ favorite: favoriteResponse })
            ),
            catchError((error: ErrorMessage) =>
              of(loadFavoriteFail({ error, id: favorite.id }))
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
