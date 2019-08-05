import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';

import { DataSelectionPreferences } from '../modules/ngx-dhis2-visualization/models/data-selection-preferences.model';
import { DashboardItem } from './dashboard-item.model';

export interface DashboardPreferences {
  id: string;
  namespace: string;
  appName: string;
  dashboardSource: string;
  defaultDashboardItems?: DashboardItem[];
  favoriteSource: string;
  dataSelectionPreferences?: DataSelectionPreferences;
  customAttributes: string[];
  menuAlignment: string;
  menuType: string;
  selectionFilterConfig?: SelectionFilterConfig;
}
