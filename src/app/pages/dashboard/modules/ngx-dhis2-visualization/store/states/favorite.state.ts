import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Favorite } from '../../models/favorite.model';

export interface FavoriteState extends EntityState<Favorite> {}

export const favoriteAdapter: EntityAdapter<Favorite> = createEntityAdapter<
  Favorite
>();

export const initialFavoriteState: FavoriteState = favoriteAdapter.getInitialState();
