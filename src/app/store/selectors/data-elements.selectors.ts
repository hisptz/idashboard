import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { DataElementAdapter } from '../reducers/data-elements.reducer';

export const getDataElementEntityState = createSelector(
  getRootState,
  (state: State) => state.dataElements
);

export const {
  selectIds: getDataElementIds,
  selectEntities: getDataElementEntitiesState,
  selectAll: getAllSystemDataElements
} = DataElementAdapter.getSelectors(getDataElementEntityState);
