import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  DashboardItemState,
  dashboardItemAdapter
} from '../states/dashboard-item.state';

const getDashboardItemState: MemoizedSelector<
  object,
  DashboardItemState
> = createFeatureSelector<DashboardItemState>('dashboardItem');

export const {
  selectAll: getDashboardItems
} = dashboardItemAdapter.getSelectors(getDashboardItemState);
