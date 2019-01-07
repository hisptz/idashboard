import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { indicatorMappingAdapter } from '../reducers/indicator-mapping.reducer';
import * as _ from 'lodash';

export const getIndicatorMappingEntityState = createSelector(
  getRootState,
  (state: State) => state.indicactorMapping
);

export const {
  selectIds: getIndicatorMappingIds,
  selectEntities: getIndicatorMappingEntities,
  selectAll: getAllIndicatorMappingObjects
} = indicatorMappingAdapter.getSelectors(getIndicatorMappingEntityState);

export const getIndicatorMappingStatus = createSelector(
  getIndicatorMappingEntities,
  getIndicatorMappingIds,
  (entities, ids) => {
    const mappingStatus = {};
    _.map(ids, (id: any) => {
      const entity = entities[id];
      const { isMapped } = entity;
      mappingStatus[id] = isMapped;
    });
    return mappingStatus;
  }
);
