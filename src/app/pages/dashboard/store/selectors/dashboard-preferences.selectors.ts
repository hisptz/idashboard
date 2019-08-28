import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { getCurrentUserManagementAuthoritiesStatus } from 'src/app/store/selectors';

import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { DashboardPreferencesState } from '../states/dashboard-preferences.state';

const getDashboardPreferencesState: MemoizedSelector<
  object,
  DashboardPreferencesState
> = createFeatureSelector<DashboardPreferencesState>('dashboardPreferences');

export const getDashboardPreferences = createSelector(
  getDashboardPreferencesState,
  (state: DashboardPreferencesState) =>
    state ? state.dashboardPreferences : null
);

export const getSelectionFilterConfig = createSelector(
  getDashboardPreferences,
  getCurrentUserManagementAuthoritiesStatus,
  (dashboardPreferences: DashboardPreferences, userIsAdmin: boolean) => {
    const filterConfig: SelectionFilterConfig = dashboardPreferences
      ? dashboardPreferences.selectionFilterConfig
      : null;

    return {
      ...filterConfig,
      allowStepSelection: userIsAdmin,
      showDataFilter: userIsAdmin,
      showValidationRuleGroupFilter: userIsAdmin
    };
  }
);

export const getDashboardPreferencesLoadingStatus = createSelector(
  getDashboardPreferencesState,
  (state: DashboardPreferencesState) => state.loading
);
