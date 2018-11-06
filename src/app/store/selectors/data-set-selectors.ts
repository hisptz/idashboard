import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { DataSetAdapter } from '../reducers/data-set.reducer';

export const getDataSetsEntityState = createSelector(
  getRootState,
  (state: State) => state.dataSet
);

export const {
  selectIds: getDataSetIds,
  selectEntities: getDataSetEntitiesState,
  selectAll: getAllDataSets
} = DataSetAdapter.getSelectors(getDataSetsEntityState);
