import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { FunctionAdapter } from '../reducers/function.reducer';

export const getFunctionEntityState = createSelector(getRootState, (state: State) => state.functions);

export const {
  selectIds: getFunctionIds,
  selectEntities: getFunctionObjectEntities,
  selectAll: getAllFunction,
  selectTotal: getFunctionsTotal
} = FunctionAdapter.getSelectors(getFunctionEntityState);

export const getFunctionById = id =>
  createSelector(getFunctionObjectEntities, (functionEntities: any) => functionEntities[id]);
