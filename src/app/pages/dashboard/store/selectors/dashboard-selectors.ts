import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { DashboardState, dashboardAdapter } from '../states/dashboard.state';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardItem } from '../../models/dashboard-item.model';
import { getFavoriteEntities } from '../../modules/ngx-dhis2-visualization/store/selectors/favorite.selectors';
import { Favorite } from '../../modules/ngx-dhis2-visualization/models/favorite.model';
import { getVisualizationObject } from '../../helpers/get-visualization-object.helper';
import { DashboardMode } from '../../constants/dashboard-modes.constant';

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
      isEditMode: currentMode === DashboardMode.EDIT
    };
  }
);
