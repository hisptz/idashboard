import { DashboardItem } from '../models/dashboard-item.model';
import { Favorite } from '../models/favorite.model';

const defaultName = 'Untitled';

export function getVisualizationName(
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
