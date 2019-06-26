import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';

export interface DashboardPreferencesState extends BaseState {
  systemInfo: DashboardPreferences;
}

export const initialDashboardPreferencesState: DashboardPreferencesState = {
  ...initialBaseState,
  systemInfo: null
};
