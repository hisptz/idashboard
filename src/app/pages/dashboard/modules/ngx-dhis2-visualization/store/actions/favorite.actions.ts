import { createAction, props } from '@ngrx/store';
import { Favorite } from '../../models/favorite.model';
import { User, SystemInfo, ErrorMessage } from '@iapps/ngx-dhis2-http-client';

export const loadFavorite = createAction(
  '[Favorite] Load favorite',
  props<{
    favorite: Favorite;
    favoriteType: string;
    visualizationId: string;
    visualizationType: string;
    currentUser?: User;
    systemInfo?: SystemInfo;
    isNew?: boolean;
  }>()
);

export const loadFavoriteFail = createAction(
  '[Favorite] Load favorite fail',
  props<{ error: ErrorMessage; id: string; visualizationId?: string }>()
);

export const updateFavorite = createAction(
  '[Favorite] Update favorite',
  props<{
    favorite: Favorite;
    visualizationId: string;
    visualizationType: string;
    systemInfo: SystemInfo;
  }>()
);

export const updateFavoriteSelections = createAction(
  '[Favorite] Update favorite selections',
  props<{
    id: string;
    changes: Partial<Favorite>;
  }>()
);

export const saveFavorites = createAction(
  '[Favorite] Save favorites',
  props<{
    favoriteDetails: Array<{ id: string; type: string }>;
    saveAction: string;
  }>()
);

export const saveFavorite = createAction(
  '[Favorite] Save favorite',
  props<{ favorite: Favorite; favoriteType: string; saveAction: string }>()
);
