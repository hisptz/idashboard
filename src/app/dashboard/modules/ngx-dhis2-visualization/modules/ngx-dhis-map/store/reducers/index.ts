import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { GeofeatureState, GeofeatureAdapter, reducer as geofeatureReducer } from './geofeature.reducers';

export interface MapState {
  geofeatures: GeofeatureState;
}

export const reducers: ActionReducerMap<MapState> = {
  geofeatures: geofeatureReducer
};

export const getMapState = createFeatureSelector<MapState>('visualization');
