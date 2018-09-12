import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { IndicatorAdapter } from '../reducers/indicactors.reducer';

export const getIndicatorEntityState = createSelector(
  getRootState,
  (state: State) => state.indicators
);

export const {
  selectIds: getAllIndicatorIds,
  selectEntities: getIndicatorsEntities,
  selectAll: getAllIndicators
} = IndicatorAdapter.getSelectors(getIndicatorEntityState);
