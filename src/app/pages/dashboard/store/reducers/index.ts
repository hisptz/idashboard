import { StoreModule } from '@ngrx/store';
import { dashboardPreferencesReducer } from './dashboard-preferences.reducer';
import { dashboardReducer } from './dashboard.reducer';
import { dashboardItemReducer } from './dashboard-item.reducer';
import { favoriteReducer } from './favorite.reducer';

export const dashboardReducers: any[] = [
  StoreModule.forFeature('dashboardPreferences', dashboardPreferencesReducer),
  StoreModule.forFeature('dashboard', dashboardReducer),
  StoreModule.forFeature('dashboardItem', dashboardItemReducer),
  StoreModule.forFeature('favorite', favoriteReducer)
];
