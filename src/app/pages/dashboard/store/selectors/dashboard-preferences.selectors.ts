import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { DashboardPreferencesState } from '../states/dashboard-preferences.state';

const getDashboardPreferencesState: MemoizedSelector<
  object,
  DashboardPreferencesState
> = createFeatureSelector<DashboardPreferencesState>('dashboardPreferences');

export const getDashboardPreferences = createSelector(
  getDashboardPreferencesState,
  (state: DashboardPreferencesState) => state.dashboardPreferences
);
