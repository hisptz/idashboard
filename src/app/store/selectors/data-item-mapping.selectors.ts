import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';

import { getAllSystemDataElements } from './data-elements.selectors';
import { getAllIndicators } from './indicators.selectors';
import { DataElement } from '../../models';
import { Indicator } from '../../dashboard/modules/ngx-dhis2-visualization/modules/map/modules/data-filter/model/indicator';
import { DataItemMappingState } from '../reducers/data-item-mapping.reducer';

export const getDataItemMappingEntityState = createSelector(
  getRootState,
  (state: State) => state.dataItemMapping
);

export const getCurrentDataItemMappingGroup = createSelector(
  getDataItemMappingEntityState,
  state => state.currentDataItemMappingGroup
);

export const getCurrentDataMappingItems = createSelector(
  getAllSystemDataElements,
  getAllIndicators,
  getCurrentDataItemMappingGroup,
  (dataElements: DataElement[], indicators: Indicator[], group) => {
    console.log(group, indicators.length, dataElements.length);
    return dataElements;
  }
);
