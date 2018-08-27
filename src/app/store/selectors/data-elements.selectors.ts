import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { DataElementAdapter } from '../reducers/data-elements.reducer';

export const getDataElementEntityState = createSelector(
  getRootState,
  (state: State) => state.dataElements
);

const {
  selectIds: getDataElementIds,
  selectEntities: getDataElementEntitiesState,
  selectAll: getAllDataElements
} = DataElementAdapter.getSelectors();
