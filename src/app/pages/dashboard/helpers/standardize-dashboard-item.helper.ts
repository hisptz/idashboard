import { getDashboardItemGridColumn } from './get-dashboard-item-grid-column.helper';
import { standardizeVisualizationType } from './standardize-visualization-type.helper';
import { DashboardItem } from '../models/dashboard-item.model';

export function standardizeDashboardItem(dashboardItem: any): DashboardItem {
  return dashboardItem
    ? {
        ...dashboardItem,
        gridColumn: getDashboardItemGridColumn(dashboardItem),
        currentType: standardizeVisualizationType(dashboardItem.type),
        height:
          dashboardItem.height && dashboardItem.height > 200
            ? `${dashboardItem.height}px`
            : '450px'
      }
    : null;
}
