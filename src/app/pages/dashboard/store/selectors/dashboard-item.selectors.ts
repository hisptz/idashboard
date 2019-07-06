import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  DashboardItemState,
  dashboardItemAdapter
} from '../states/dashboard-item.state';
import { DashboardItem } from '../../models/dashboard-item.model';

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
