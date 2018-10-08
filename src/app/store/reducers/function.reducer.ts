import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Function } from '../../models/function-rule';
import { FunctionActions, FunctionActionTypes } from '../actions';

export interface FunctionState extends EntityState<Function> {
  loading: boolean;
  loaded: boolean;
}

export const FunctionAdapter: EntityAdapter<Function> = createEntityAdapter<
  Function
>();

const initialState: FunctionState = FunctionAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function FunctionReducer(
  state = initialState,
  action: FunctionActions
): FunctionState {
  switch (action.type) {
    case FunctionActionTypes.LoadFunctions: {
      return { ...state, loading: true };
    }
    case FunctionActionTypes.LoadFunctionSuccess: {
      return FunctionAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case FunctionActionTypes.LoadFunctionFail: {
      return { ...state, loading: false, loaded: false };
    }
    default: {
      return state;
    }
  }
}
