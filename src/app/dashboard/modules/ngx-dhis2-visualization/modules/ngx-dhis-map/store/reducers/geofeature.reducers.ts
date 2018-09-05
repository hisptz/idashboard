import { GeofeatureActions, GeofeatureActionTypes } from '../actions/geofeature.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LayerGeofeature } from '../../models';

export interface GeofeatureState extends EntityState<LayerGeofeature> {
  loading: boolean;
  loaded: boolean;
  errorMsg: null;
}

export const GeofeatureAdapter: EntityAdapter<LayerGeofeature> = createEntityAdapter<LayerGeofeature>();

const initialState: GeofeatureState = GeofeatureAdapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export function reducer(state = initialState, action: GeofeatureActions): GeofeatureState {
  switch (action.type) {
    case GeofeatureActionTypes.LoadGeofeatures: {
      return { ...state, loading: true, loaded: false, errorMsg: null };
    }

    case GeofeatureActionTypes.LoadGeofeaturesSuccess: {
      return GeofeatureAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }
    case GeofeatureActionTypes.LoadGeofeaturesFail: {
      return { ...state, loading: false, loaded: false, errorMsg: action.error };
    }

    default: {
      return state;
    }
  }
}

export const getGeofeatureLoadedState = (state: GeofeatureState) => state.loaded;
export const getGeofeatureLoadingState = (state: GeofeatureState) => state.loading;
