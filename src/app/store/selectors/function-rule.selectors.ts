import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { functionRuleAdapter } from '../reducers/function-rule.reducer';

export const getFunctionRuleEntityState = createSelector(
  getRootState,
  (state: State) => state.functionRules
);

export const {
  selectIds: getFunctionRuleIds,
  selectEntities: getFuctionRuleEntitiesState,
  selectAll: getAllFuctionRules
} = functionRuleAdapter.getSelectors(getFunctionRuleEntityState);
