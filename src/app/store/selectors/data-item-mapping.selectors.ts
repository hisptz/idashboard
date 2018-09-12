import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import * as _ from 'lodash';

import { getAllSystemDataElements, getAllIndicators } from '.';
import { DataElement, Indicator } from '../../models';
import { DataItemMappingState } from '../reducers/data-item-mapping.reducer';

export const getDataItemMappingEntityState = createSelector(
  getRootState,
  (state: State) => state.dataItemMapping
);

export const getCurrentDataItemMappingGroup = createSelector(
  getDataItemMappingEntityState,
  (state: DataItemMappingState) => state.currentDataItemMappingGroup
);

export const getCurrentDataFilterItems = createSelector(
  getAllSystemDataElements,
  getAllIndicators,
  getCurrentDataItemMappingGroup,
  (dataElements: DataElement[], indicators: Indicator[], group) => {
    let dataFilterItems = [];
    if (group) {
      if (group.id === 'all') {
        dataFilterItems = _.sortBy(
          _.concat(dataFilterItems, _.concat(dataElements, indicators)),
          'name'
        );
      } else if (group.id === 'de') {
        dataFilterItems = _.sortBy(
          _.concat(dataFilterItems, dataElements),
          'name'
        );
      } else if (group.id === 'in') {
        dataFilterItems = _.sortBy(
          _.concat(dataFilterItems, indicators),
          'name'
        );
      }
    }
    return dataFilterItems;
  }
);
