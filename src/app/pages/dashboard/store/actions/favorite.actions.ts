import { createAction, props } from '@ngrx/store';
import { Favorite } from '../../models/favorite.model';
import { ErrorMessage } from 'src/app/core';

export const loadFavorite = createAction(
  '[Favorite] Load favorite',
  props<{ favoriteId: string; favoriteType: string; dashboardItemId: string }>()
);

export const loadFavoriteFail = createAction(
  '[Favorite] Load favorite fail',
  props<{ error: ErrorMessage; id: string }>()
);

export const updateFavorite = createAction(
  '[Favorite] Update favorite',
  props<{ favorite: Favorite }>()
);
