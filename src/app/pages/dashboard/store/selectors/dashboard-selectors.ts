import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { DashboardMode } from '../../constants/dashboard-modes.constant';
import { Dashboard } from '../../models/dashboard.model';
import { dashboardAdapter, DashboardState } from '../states/dashboard.state';
import { getDashboardPreferencesLoadingStatus } from './dashboard-preferences.selectors';

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

export const getDashboardItemsForCurrentDashboard = createSelector(
  getCurrentDashboard,
  (dashboard: Dashboard) => (dashboard ? dashboard.dashboardItems : [])
);

export const getDashboardMode = createSelector(
  getDashboardState,
  (state: DashboardState) => {
    const currentMode = state.dashboardMode;
    return {
      isViewMode: currentMode === DashboardMode.VIEW,
      isEditMode: currentMode === DashboardMode.EDIT,
      isSaveMode: currentMode === DashboardMode.SAVE
    };
  }
);

export const getDashboardLoadingStatus = createSelector(
  getDashboardState,
  (state: DashboardState) => state.loading
);

export const getOverallDashboardLoadingStatus = createSelector(
  getDashboardLoadingStatus,
  getDashboardPreferencesLoadingStatus,
  (dashboardLoading: boolean, dashboardPreferencesLoading: boolean) =>
    dashboardLoading || dashboardPreferencesLoading
);
