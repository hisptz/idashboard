import * as fromDynamicDimension from '../reducers/dynamic-dimension.reducer';
import { createSelector } from '@ngrx/store';

export const getDynamicDimensionInitiatedStatus = createSelector(
  fromDynamicDimension.getDynamicDimensionState,
  (state: fromDynamicDimension.State) => state.loadInitiated
);

export const getDynamicDimensionLoadingStatus = createSelector(
  fromDynamicDimension.getDynamicDimensionState,
  (state: fromDynamicDimension.State) => state.loading
);
