import { createAction, props } from '@ngrx/store';
import { DashboardItem } from '../../models/dashboard-item.model';
import { ErrorMessage } from 'src/app/core';

export const initializeDashboardItem = createAction(
  '[DashboardItem] Initialize dashboard item',
  props<{ dashboardItem: DashboardItem }>()
);

export const loadDashboardItem = createAction(
  '[DashboardItem] Load dashboard item',
  props<{ dashboardItem: DashboardItem }>()
);

export const addDashboardItems = createAction(
  '[DashboardItem] Add dashboard items',
  props<{ dashboardItems: DashboardItem[] }>()
);

export const loadDashboardItemFail = createAction(
  '[DashboardItem] Load dashboard item fail',
  props<{ error: ErrorMessage; id: string }>()
);

export const removeDashboardItem = createAction(
  '[DashboardItem] Remove dashboard item',
  props<{ id: string }>()
);

export const removeDashboardItemSuccess = createAction(
  '[DashboardItem] Remove Dashboard item Success',
  props<{ id: string }>()
);

export const removeDashboardItemFail = createAction(
  '[DashboardItem] Remove Dashboard item Fail',
  props<{ id: string; error: ErrorMessage }>()
);

export const updateDashboardItem = createAction(
  '[DashboardItem] Update Dashboard item',
  props<{ dashboardItem: DashboardItem }>()
);
