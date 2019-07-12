import { camelCase } from 'lodash';

import { DashboardItem } from '../models/dashboard-item.model';
import {
  checkIfVisualizationIsNonVisualizable,
  getStandardizedVisualizationType,
  getStandardizedVisualizationUiConfig,
  getVisualizationLayersFromFavorite
} from '../modules/ngx-dhis2-visualization/helpers';
import { Visualization } from '../modules/ngx-dhis2-visualization/models';
import { getVisualizationName } from './get-visualization-name.helper';
import { Favorite } from '../models/favorite.model';

export function getVisualizationObject(
  dashboardItem: DashboardItem,
  favorite: Favorite
): Visualization {
  if (!dashboardItem) {
    return null;
  }

  const name = getVisualizationName(dashboardItem, favorite);
  return {
    id: dashboardItem.id,
    name,
    type: dashboardItem.type,
    currentType: getStandardizedVisualizationType(dashboardItem.type),
    created: dashboardItem.created,
    lastUpdated: dashboardItem.lastUpdated,
    appKey: dashboardItem.appKey,
    isNonVisualizable: checkIfVisualizationIsNonVisualizable(
      dashboardItem.type
    ),
    progress: {
      statusCode: 200,
      statusText: 'OK',
      percent: 0,
      message: `Loading Data for ${name}....`
    },
    uiConfig: getStandardizedVisualizationUiConfig(dashboardItem),
    layers: getVisualizationLayersFromFavorite(favorite, dashboardItem.type)
  };
}
