import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import * as _ from 'lodash';

import { getAllSystemDataElements } from './data-elements.selectors';
import { getAllIndicators } from './indicators.selectors';
import { DataElement, Indicator, DataSet } from '../../models';
import { DataItemMappingState } from '../reducers/data-item-mapping.reducer';
import { getAllDataSets } from './data-set-selectors';

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
  getAllDataSets,
  getCurrentDataItemMappingGroup,
  (
    dataElements: DataElement[],
    indicators: Indicator[],
    dataSets: DataSet[],
    group
  ) => {
    let dataFilterItems = [];
    if (group) {
      if (group.id === 'all') {
        dataFilterItems = _.sortBy(
          _.concat(
            dataFilterItems,
            _.concat(dataElements, _.concat(indicators, dataSets))
          ),
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
      } else if (group.id === 'ds') {
        dataFilterItems = _.sortBy(_.concat(dataFilterItems, dataSets), 'name');
      }
    }
    return dataFilterItems;
  }
);
