import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  IndicatorMappingActions,
  IndicatorMappingActionTypes
} from '../actions';

interface InidcatorMapping {
  id: string;
  isMapped: boolean;
}

export interface IndicatorMapppingState extends EntityState<InidcatorMapping> {}

export const indicatorMappingAdapter: EntityAdapter<
  InidcatorMapping
> = createEntityAdapter<InidcatorMapping>();

const initialState: IndicatorMapppingState = indicatorMappingAdapter.getInitialState(
  {
    // additional entity state properties
  }
);

export function IndicatorMapppingReducer(
  state = initialState,
  action: IndicatorMappingActions
): IndicatorMapppingState {
  switch (action.type) {
    case IndicatorMappingActionTypes.AddIndicatorsMapping: {
      return indicatorMappingAdapter.addMany(action.payload, state);
    }
    case IndicatorMappingActionTypes.UpdateIndicatorsMapping: {
      return indicatorMappingAdapter.updateMany(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
