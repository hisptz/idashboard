import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { FunctionAdapter } from '../reducers/function.reducer';

export const getFunctionEntityState = createSelector(
  getRootState,
  (state: State) => state.functions
);

export const {
  selectIds: getFunctionIds,
  selectEntities: getFunctionEntitiesState,
  selectAll: getAllFunction
} = FunctionAdapter.getSelectors(getFunctionEntityState);
