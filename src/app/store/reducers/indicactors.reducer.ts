import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IndicatorActions, IndicatorActionTypes } from '../actions';
import { Indicator } from '../../models';

export interface IndicatorState extends EntityState<Indicator> {
  loading: boolean;
  loaded: boolean;
}

export const IndicatorAdapter: EntityAdapter<Indicator> = createEntityAdapter<
  Indicator
>();

const initialState: IndicatorState = IndicatorAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function indicatorReducer(
  state = initialState,
  action: IndicatorActions
): IndicatorState {
  switch (action.type) {
    case IndicatorActionTypes.LoadIndicators: {
      return { ...state, loading: true };
    }
    case IndicatorActionTypes.LoadIndicatorsSuccess: {
      return IndicatorAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case IndicatorActionTypes.LoadIndicatorsFail: {
      return { ...state, loading: false, loaded: false };
    }
    default: {
      return state;
    }
  }
}
