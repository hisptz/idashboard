import { StoreModule } from '@ngrx/store';
import { dashboardPreferencesReducer } from './dashboard-preferences.reducer';
import { dashboardReducer } from './dashboard.reducer';
import { dashboardItemReducer } from './dashboard-item.reducer';

export const dashboardReducers: any[] = [
  StoreModule.forFeature('dashboardPreferences', dashboardPreferencesReducer),
  StoreModule.forFeature('dashboard', dashboardReducer),
  StoreModule.forFeature('dashboardItem', dashboardItemReducer)
];
