import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { DashboardItem } from '../../models/dashboard-item.model';
import {
  dashboardItemAdapter,
  DashboardItemState
} from '../states/dashboard-item.state';
import { getDashboardItemsForCurrentDashboard } from './dashboard-selectors';

const getDashboardItemState: MemoizedSelector<
  object,
  DashboardItemState
> = createFeatureSelector<DashboardItemState>('dashboardItem');

export const {
  selectAll: getDashboardItems,
  selectEntities: getDashboardItemEntities
} = dashboardItemAdapter.getSelectors(getDashboardItemState);

export const getDashboardItemById = (id: string) =>
  createSelector(
    getDashboardItemEntities,
    (dashboardItemEntities: { string: DashboardItem }) =>
      dashboardItemEntities ? dashboardItemEntities[id] : null
  );

export const getCurrentDashboardItems = createSelector(
  getDashboardItemsForCurrentDashboard,
  getDashboardItemEntities,
  (dashboardItems: DashboardItem[], dashboardItemEntities: any) =>
    dashboardItems.map((dashboardItem: any) => {
      const newDashboardItem: DashboardItem =
        dashboardItemEntities[dashboardItem.id] || dashboardItem;

      return newDashboardItem &&
        newDashboardItem.notification &&
        (newDashboardItem.notification.loaded ||
          newDashboardItem.notification.hasError)
        ? newDashboardItem
        : null;
    })
);
