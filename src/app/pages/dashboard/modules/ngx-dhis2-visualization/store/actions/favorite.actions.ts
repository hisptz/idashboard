import { createAction, props } from '@ngrx/store';
import { Favorite } from '../../models/favorite.model';
import { ErrorMessage } from 'src/app/core';
import { User, SystemInfo } from '@iapps/ngx-dhis2-http-client';

export const loadFavorite = createAction(
  '[Favorite] Load favorite',
  props<{
    favorite: Favorite;
    favoriteType: string;
    dashboardItemId: string;
    currentUser?: User;
    systemInfo?: SystemInfo;
    isNew?: boolean;
  }>()
);

export const loadFavoriteFail = createAction(
  '[Favorite] Load favorite fail',
  props<{ error: ErrorMessage; id: string }>()
);

export const updateFavorite = createAction(
  '[Favorite] Update favorite',
  props<{ favorite: Favorite }>()
);
