import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { Dashboard } from '../../models/dashboard.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DashboardMode } from '../../constants/dashboard-modes.constant';

export interface DashboardState extends EntityState<Dashboard>, BaseState {
  currentDashboard: string;
  currentVisualization: string;
  dashboardMode: string;
}

export function sortByName(a: Dashboard, b: Dashboard): number {
  return a.name.localeCompare(b.name);
}

export const dashboardAdapter: EntityAdapter<Dashboard> = createEntityAdapter<
  Dashboard
>({
  sortComparer: sortByName
});

export const initialDashboardState: DashboardState = dashboardAdapter.getInitialState(
  {
    ...initialBaseState,
    currentDashboard: '',
    currentVisualization: '',
    dashboardMode: DashboardMode.VIEW
  }
);
