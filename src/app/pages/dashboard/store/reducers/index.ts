import { StoreModule } from '@ngrx/store';

import { dashboardPreferencesReducer } from './dashboard-preferences.reducer';
import { dashboardReducer } from './dashboard.reducer';
import { favoriteReducer } from '../../modules/ngx-dhis2-visualization/store/reducers/favorite.reducer';

export const dashboardReducers: any[] = [
  StoreModule.forFeature('dashboardPreferences', dashboardPreferencesReducer),
  StoreModule.forFeature('dashboard', dashboardReducer),
  StoreModule.forFeature('favorite', favoriteReducer)
];
