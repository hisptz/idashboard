import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { DashboardState, dashboardAdapter } from '../states/dashboard.state';
import { Dashboard } from '../../models/dashboard.model';

const getDashboardState: MemoizedSelector<
  object,
  DashboardState
> = createFeatureSelector<DashboardState>('dashboard');

export const {
  selectEntities: getDashboardEntities,
  selectAll: getDashboards
} = dashboardAdapter.getSelectors(getDashboardState);

export const getCurrentDashboardId = createSelector(
  getDashboardState,
  (state: DashboardState) => state.currentDashboard
);

export const getCurrentDashboard = createSelector(
  getDashboardEntities,
  getCurrentDashboardId,
  (dashboardEntities: any, currentDashboardId) =>
    dashboardEntities ? dashboardEntities[currentDashboardId] : null
);

export const getCurrentDashboardItems = createSelector(
  getCurrentDashboard,
  (dashboard: Dashboard) => (dashboard ? dashboard.dashboardItems : [])
);
