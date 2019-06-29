import { getDashboardItemGripColumnFromWidth } from './get-dashboard-item-grid-column-from-width.helper';
import { getDashboardItemGripColumnFromShape } from './get-dashboard-item-grid-column-from-shape.helper';
import { DashboardItem } from '../models/dashboard-item.model';

export function getDashboardItemGridColumn(dashboardItem: DashboardItem) {
  return dashboardItem.width
    ? getDashboardItemGripColumnFromWidth(dashboardItem.width)
    : getDashboardItemGripColumnFromShape(dashboardItem.shape);
}
