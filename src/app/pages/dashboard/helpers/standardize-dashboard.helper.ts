import { getDashboardBookmarkStatus } from './get-dashboard-bookmark-status.helper';
import { getDashboardAccess } from './get-dashboard-access.helper';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Dashboard } from '../models/dashboard.model';
import { standardizeDashboardItem } from './standardize-dashboard-item.helper';
import { DashboardPreferences } from '../models/dashboard-preferences.model';

export function standardizeDashboard(
  dashboard: any,
  dashboardPreferences: DashboardPreferences,
  currentUser: User
): Dashboard {
  if (!dashboard) {
    return null;
  }
  return {
    ...dashboard,
    favorite: dashboard.hasOwnProperty('favorite')
      ? dashboard.favorite
      : getDashboardBookmarkStatus(
          dashboard.favorites || dashboard.bookmarks,
          currentUser ? currentUser.id : ''
        ),
    dashboardItems: (dashboard.dashboardItems || []).map((dashboardItem: any) =>
      standardizeDashboardItem(dashboardItem, dashboardPreferences)
    ),
    access: dashboard.access || getDashboardAccess(dashboard, currentUser)
  };
}
