import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { FunctionRule } from '../../models/function-rule';
import { FunctionRuleActions, FunctionRuleActionTypes } from '../actions';

export interface FunctionRuleState extends EntityState<FunctionRule> {
  loading: boolean;
  loaded: boolean;
}

export const functionRuleAdapter: EntityAdapter<
  FunctionRule
> = createEntityAdapter<FunctionRule>();

const initialState: FunctionRuleState = functionRuleAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function functionRuleReducer(
  state = initialState,
  action: FunctionRuleActions
): FunctionRuleState {
  switch (action.type) {
    case FunctionRuleActionTypes.LoadFunctionRules: {
      return { ...state, loading: true };
    }
    case FunctionRuleActionTypes.LoadFunctionRuleSuccess: {
      return functionRuleAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case FunctionRuleActionTypes.UpdateFunctionRule: {
      return functionRuleAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    }
    case FunctionRuleActionTypes.LoadFunctionRuleFail: {
      return { ...state, loading: false, loaded: false };
    }
    default: {
      return state;
    }
  }
}

const {
  selectIds: getFunctionRuleIds,
  selectEntities: getFuctionRuleEntitiesState,
  selectAll: getAllFuctionRules
} = functionRuleAdapter.getSelectors();
