import { getDashboardItemGridColumn } from './get-dashboard-item-grid-column.helper';
import { standardizeVisualizationType } from './standardize-visualization-type.helper';
import { DashboardItem } from '../models/dashboard-item.model';
import { getVisualizationObject } from './get-visualization-object.helper';
import { DashboardPreferences } from '../models/dashboard-preferences.model';

export function standardizeDashboardItem(
  dashboardItem: any,
  dashboardPreferences?: DashboardPreferences
): DashboardItem {
  return dashboardItem
    ? {
        ...dashboardItem,
        gridColumn: getDashboardItemGridColumn(dashboardItem),
        currentType: standardizeVisualizationType(dashboardItem.type),
        height:
          dashboardItem.height && dashboardItem.height > 200
            ? `${dashboardItem.height}px`
            : '450px',
        visualization: getVisualizationObject(
          dashboardItem,
          dashboardPreferences
        )
      }
    : null;
}
