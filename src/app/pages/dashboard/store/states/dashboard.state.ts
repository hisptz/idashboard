import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { Dashboard } from '../../models/dashboard.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface DashboardState extends EntityState<Dashboard>, BaseState {
  currentDashboard: string;
  currentVisualization: string;
}

export const dashboardAdapter: EntityAdapter<Dashboard> = createEntityAdapter<
  Dashboard
>();

export const initialDashboardState: DashboardState = dashboardAdapter.getInitialState(
  {
    ...initialBaseState,
    currentDashboard: '',
    currentVisualization: ''
  }
);
