import { createAction, props } from '@ngrx/store';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { ErrorMessage } from 'src/app/core';

export const loadDashboardPreferences = createAction(
  '[DashboardPreferences] Load Dashboard preferences'
);

export const addDashboardPreferences = createAction(
  '[DashboardPreferences] Add Dashboard preferences',
  props<{ dashboardPreferences: DashboardPreferences }>()
);

export const loadDashboardPreferencesFail = createAction(
  '[DashboardPreferences] Load Dashboard preferences fail',
  props<{ error: ErrorMessage }>()
);
