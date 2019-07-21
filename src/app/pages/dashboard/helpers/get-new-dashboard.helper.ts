import { Dashboard } from '../models/dashboard.model';
import { DashboardItem } from '../models/dashboard-item.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { DashboardAccess } from '../constants/dashboard-access.constant';

export function getNewDashboard(
  currentUser: User,
  defaultDashboardItems: DashboardItem[] = []
): Dashboard {
  return {
    id: 'new',
    name: '',
    dashboardItems: defaultDashboardItems,
    user: currentUser ? { id: currentUser.id } : null,
    publicAccess: DashboardAccess.NO_ACCESS,
    externalAccess: false
  };
}
