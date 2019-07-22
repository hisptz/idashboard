import { DashboardPreferencesService } from './dashboard-preferences.service';
import { DashboardService } from './dashboard.service';
import { DashboardItemService } from './dashboard-item.service';
import { FavoriteService } from '../modules/ngx-dhis2-visualization/services/favorite.service';

export const services: any[] = [
  DashboardPreferencesService,
  DashboardService,
  DashboardItemService,
  FavoriteService
];
