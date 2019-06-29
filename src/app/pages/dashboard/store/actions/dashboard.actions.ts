import { createAction, props } from '@ngrx/store';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { ErrorMessage } from 'src/app/core';
import { Dashboard } from '../../models/dashboard.model';

export const loadDashboards = createAction(
  '[Dashboard] Load Dashboards',
  props<{ dashboardPreferences: DashboardPreferences }>()
);

export const loadDashboardsFail = createAction(
  '[Dashboard] Load Dashboards fail',
  props<{ error: ErrorMessage }>()
);

export const addDashboards = createAction(
  '[Dashboard] Add Dashboards',
  props<{ dashboards: Dashboard[] }>()
);

export const saveDashboard = createAction(
  '[Dashboard] Save Dashboard',
  props<{ dashboard: Dashboard; action: string }>()
);

export const saveDashboardSuccess = createAction(
  '[Dashboard] Save Dashboard Success',
  props<{ dashboard: Dashboard }>()
);

export const saveDashboardFail = createAction(
  '[Dashboard] Save Dashboard Fail',
  props<{ error: ErrorMessage; id?: string }>()
);

export const updateDashboard = createAction(
  '[Dashboard] Update Dashboard',
  props<{ dashboard: Dashboard }>()
);

export const removeDashboard = createAction(
  '[Dashboard] Remove Dashboard',
  props<{ id: string }>()
);

export const removeDashboardSuccess = createAction(
  '[Dashboard] Remove Dashboard Success',
  props<{ id: string }>()
);

export const removeDashboardFail = createAction(
  '[Dashboard] Remove Dashboard Fail',
  props<{ id: string; error: ErrorMessage }>()
);

export const setCurrentDashboard = createAction(
  '[Dashboard] Set current dashboard',
  props<{ dashboard: Dashboard }>()
);
