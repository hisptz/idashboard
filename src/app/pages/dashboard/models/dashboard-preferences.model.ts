import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';
import { DashboardItem } from './dashboard-item.model';

export interface DashboardPreferences {
  id: string;
  namespace: string;
  appName: string;
  dashboardSource: string;
  defaultDashboardItems?: DashboardItem[];
  favoriteSource: string;
  customAttributes: string[];
  menuAlignment: string;
  menuType: string;
  selectionFilterConfig?: SelectionFilterConfig;
}
