import { DashboardPreferencesEffects } from './dashboard-preferences.effects';
import { DashboardEffects } from './dashboard.effects';
import { DashboardItemEffects } from './dashboard-item.effects';
import { FavoriteEffects } from './favorite.effects';

export const dashboardEffects: any[] = [
  DashboardPreferencesEffects,
  DashboardEffects,
  DashboardItemEffects,
  FavoriteEffects
];
