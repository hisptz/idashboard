import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { FavoriteState, favoriteAdapter } from '../states/favorite.state';

const getFavoriteState: MemoizedSelector<
  object,
  FavoriteState
> = createFeatureSelector<FavoriteState>('favorite');

export const {
  selectAll: getFavorites,
  selectEntities: getFavoriteEntities
} = favoriteAdapter.getSelectors(getFavoriteState);

export const getFavoritesByIds = (ids: string[]) =>
  createSelector(
    getFavoriteEntities,
    (favoriteEntities: any) => {
      return ids
        .map((id: string) => (favoriteEntities ? favoriteEntities[id] : null))
        .filter(favorite => favorite);
    }
  );
