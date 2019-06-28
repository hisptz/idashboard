import { StoreModule } from '@ngrx/store';
import { dashboardPreferencesReducer } from './dashboard-preferences.reducer';
import { dashboardReducer } from './dashboard.reducer';

export const dashboardReducers: any[] = [
  StoreModule.forFeature('dashboardPreferences', dashboardPreferencesReducer),
  StoreModule.forFeature('dashboard', dashboardReducer)
];
