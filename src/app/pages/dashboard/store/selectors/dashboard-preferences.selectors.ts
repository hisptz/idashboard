import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { DashboardPreferencesState } from '../states/dashboard-preferences.state';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';

const getDashboardPreferencesState: MemoizedSelector<
  object,
  DashboardPreferencesState
> = createFeatureSelector<DashboardPreferencesState>('dashboardPreferences');

export const getDashboardPreferences = createSelector(
  getDashboardPreferencesState,
  (state: DashboardPreferencesState) => state.dashboardPreferences
);

export const getSelectionFilterConfig = createSelector(
  getDashboardPreferences,
  (dashboardPreferences: DashboardPreferences) =>
    dashboardPreferences ? dashboardPreferences.selectionFilterConfig : null
);
