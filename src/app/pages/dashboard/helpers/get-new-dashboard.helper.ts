import { Dashboard } from '../models/dashboard.model';
import { DashboardItem } from '../models/dashboard-item.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { DashboardAccess } from '../constants/dashboard-access.constant';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';
import { checkIfVisualizationIsNonVisualizable } from '../modules/ngx-dhis2-visualization/helpers';
import { camelCase } from 'lodash';
import { standardizeDashboardItem } from './standardize-dashboard-item.helper';

export function getNewDashboard(
  currentUser: User,
  defaultDashboardItems: DashboardItem[] = []
): Dashboard {
  return {
    id: 'new',
    name: '',
    dashboardItems: getNewDashboardItems(defaultDashboardItems),
    user: currentUser ? { id: currentUser.id } : null,
    publicAccess: DashboardAccess.NO_ACCESS,
    externalAccess: false
  };
}

function getNewDashboardItems(
  defaultDashboardItems: DashboardItem[]
): DashboardItem[] {
  return (defaultDashboardItems || []).map((dashboardItem: DashboardItem) => {
    const isNonVisualizable = checkIfVisualizationIsNonVisualizable(
      dashboardItem.type
    );

    const favorite = !isNonVisualizable ? { id: generateUid() } : null;

    const initialDashboardItem = {
      ...dashboardItem,
      id: generateUid()
    };

    return standardizeDashboardItem(
      favorite
        ? { ...initialDashboardItem, [camelCase(dashboardItem.type)]: favorite }
        : initialDashboardItem
    );
  });
}
