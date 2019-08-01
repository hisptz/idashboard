import { createAction, props } from '@ngrx/store';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { ErrorMessage } from 'src/app/core';
import { Dashboard } from '../../models/dashboard.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { DashboardItem } from '../../models/dashboard-item.model';

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
  props<{ dashboards: Dashboard[]; currentUser: User }>()
);

export const addDashboard = createAction(
  '[Dashboard] Add Dashboard',
  props<{ dashboard: Dashboard }>()
);

export const createDashboard = createAction('[Dashboard] Create Dashboard');

export const initializeDashboardSave = createAction(
  '[Dashboard] Initialize dashboard save'
);

export const saveDashboard = createAction(
  '[Dashboard] Save Dashboard',
  props<{ dashboard: Dashboard; action: string; originalId: string }>()
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
  props<{ id: string }>()
);

export const toggleDashboardMode = createAction(
  '[Dashboard] Toggle dashboard mode'
);

export const enableEditMode = createAction('[Dashboard] Enable edit mode');

export const enableViewMode = createAction('[Dashboard] Enable view mode');
