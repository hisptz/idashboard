import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { DashboardState, dashboardAdapter } from '../states/dashboard.state';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardItem } from '../../models/dashboard-item.model';
import { getFavoriteEntities } from './favorite.selectors';
import { Favorite } from '../../models/favorite.model';
import { getVisualizationObject } from '../../helpers/get-visualization-object.helper';

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

export const getDashboardItemVisualization = (
  dashboardItem: DashboardItem,
  favoriteId: string
) =>
  createSelector(
    getFavoriteEntities,
    (favoriteEntities: { string: Favorite }) => {
      const favorite: Favorite = favoriteEntities
        ? favoriteEntities[favoriteId]
        : null;

      return dashboardItem &&
        favorite &&
        favorite.notification &&
        (favorite.notification.loaded || favorite.notification.hasError)
        ? getVisualizationObject(dashboardItem, favorite)
        : null;
    }
  );
