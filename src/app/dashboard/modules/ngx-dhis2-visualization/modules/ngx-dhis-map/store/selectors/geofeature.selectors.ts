import { createSelector } from '@ngrx/store';
import {
  getGeofeatureLoadedState,
  getGeofeatureLoadingState,
  GeofeatureAdapter
} from '../reducers/geofeature.reducers';
import { getMapState, MapState } from '../reducers';

export const getGeofeatureEntityState = createSelector(getMapState, (state: MapState) => state.geofeatures);

export const {
  selectIds: getGeofeatureIds,
  selectEntities: getGeofeatureEntities,
  selectAll: getAllGeofeature,
  selectTotal: getTotalGeofeature
} = GeofeatureAdapter.getSelectors(getGeofeatureEntityState);

export const getGeofeatureLoaded = createSelector(getGeofeatureEntityState, getGeofeatureLoadedState);
export const getGeofeatureLoading = createSelector(getGeofeatureEntityState, getGeofeatureLoadingState);
