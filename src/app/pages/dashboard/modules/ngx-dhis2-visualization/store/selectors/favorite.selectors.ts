import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { FavoriteState, favoriteAdapter } from '../states/favorite.state';

const getFavoriteState: MemoizedSelector<
  object,
  FavoriteState
> = createFeatureSelector<FavoriteState>('favorite');

export const {
  selectAll: getFavorites,
  selectEntities: getFavoriteEntities
} = favoriteAdapter.getSelectors(getFavoriteState);
