import { camelCase, isPlainObject, isArray } from 'lodash';

import { DashboardItem } from '../models/dashboard-item.model';
import {
  checkIfVisualizationIsNonVisualizable,
  getStandardizedVisualizationType,
  getStandardizedVisualizationUiConfig
} from '../modules/ngx-dhis2-visualization/helpers';
import {
  Visualization,
  VisualizationVm
} from '../modules/ngx-dhis2-visualization/models';
import { Favorite } from '../modules/ngx-dhis2-visualization/models/favorite.model';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';

const defaultName = 'Untitled';

export function getVisualizationObject(
  dashboardItem: DashboardItem
): Visualization {
  if (!dashboardItem) {
    return null;
  }

  const favorite = getFavorite(dashboardItem);

  const name = getVisualizationName(dashboardItem, favorite);
  const isNonVisualizable = checkIfVisualizationIsNonVisualizable(
    dashboardItem.type
  );
  return {
    id: dashboardItem.id,
    name,
    type: dashboardItem.type,
    currentType: getStandardizedVisualizationType(dashboardItem.type),
    created: dashboardItem.created,
    lastUpdated: dashboardItem.lastUpdated,
    favorite,
    appKey: dashboardItem.appKey,
    isNonVisualizable,
    progress: isNonVisualizable
      ? {
          statusCode: 200,
          statusText: 'OK',
          percent: 100,
          message: 'Information has been loaded'
        }
      : {
          statusCode: 200,
          statusText: 'OK',
          percent: 0,
          message: `Loading Data for ${name}....`
        },
    uiConfig: getStandardizedVisualizationUiConfig(dashboardItem),
    layers: getVisualizationLayers(dashboardItem)
  };
}

function getVisualizationLayers(visualizationItem: any) {
  if (!visualizationItem) {
    return [];
  }

  const favorite = visualizationItem[camelCase(visualizationItem.type)];

  if (!favorite) {
    return [
      {
        id: generateUid(),
        dataSelections: [],
        config: null
      }
    ];
  }

  return isArray(favorite)
    ? [
        {
          id: visualizationItem.id,
          analytics: {
            rows: favorite
          }
        }
      ]
    : [];
}

function getFavorite(dashboardItem: DashboardItem) {
  const favorite = dashboardItem[camelCase(dashboardItem.type)];
  return isPlainObject(favorite) ? favorite : null;
}

function getVisualizationName(
  dashboardItem: DashboardItem,
  favorite: Favorite
) {
  if (!dashboardItem) {
    return defaultName;
  }

  switch (dashboardItem.type) {
    case 'APP':
      return dashboardItem.appKey;
    case 'MESSAGES':
      return 'Messages';
    case 'RESOURCES':
      return 'Resources';
    case 'REPORTS':
      return 'Reports';
    case 'USERS':
      return 'Users';
    default:
      return favorite ? favorite.name || defaultName : defaultName;
  }
}
