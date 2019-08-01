import { createReducer, on } from '@ngrx/store';
import {
  errorBaseState,
  loadedBaseState,
  loadingBaseState
} from 'src/app/store/states/base.state';

import {
  addDashboardPreferences,
  loadDashboardPreferences,
  loadDashboardPreferencesFail
} from '../actions/dashboard-preferences.actions';
import {
  DashboardPreferencesState,
  initialDashboardPreferencesState
} from '../states/dashboard-preferences.state';

const reducer = createReducer(
  initialDashboardPreferencesState,
  on(loadDashboardPreferences, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addDashboardPreferences, (state, { dashboardPreferences }) => ({
    ...state,
    ...loadedBaseState,
    dashboardPreferences
  })),
  on(loadDashboardPreferencesFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  }))
);

export function dashboardPreferencesReducer(
  state,
  action
): DashboardPreferencesState {
  return reducer(state, action);
}
