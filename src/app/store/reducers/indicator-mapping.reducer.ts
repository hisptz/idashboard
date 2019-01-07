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

export const FunctionAdapter: EntityAdapter<
  InidcatorMapping
> = createEntityAdapter<InidcatorMapping>();

const initialState: IndicatorMapppingState = FunctionAdapter.getInitialState({
  // additional entity state properties
});

export function IndicatorMapppingReducer(
  state = initialState,
  action: IndicatorMappingActions
): IndicatorMapppingState {
  switch (action.type) {
    case IndicatorMappingActionTypes.AddIndicatorsMapping: {
      console.log('adding mapping');
      return state;
    }
    case IndicatorMappingActionTypes.UpdateIndicatorsMapping: {
      console.log('updating mapping');
      return state;
    }
    default: {
      return state;
    }
  }
}
