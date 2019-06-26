import { StoreModule } from '@ngrx/store';
import { dashboardPreferencesReducer } from './dashboard-preferences.reducer';

export const dashboardReducers: any[] = [
  StoreModule.forFeature('dashboardPreferences', dashboardPreferencesReducer)
];
