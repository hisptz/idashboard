import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { DashboardPreferencesState } from '../states/dashboard-preferences.state';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';
import {
  getCurrentUser,
  getCurrentUserManagementAuthoritiesStatus
} from 'src/app/store/selectors';
import { User } from '@iapps/ngx-dhis2-http-client';

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
