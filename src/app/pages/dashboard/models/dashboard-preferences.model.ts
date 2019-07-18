import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';

export interface DashboardPreferences {
  id: string;
  namespace: string;
  appName: string;
  dashboardSource: string;
  favoriteSource: string;
  customAttributes: string[];
  menuAlignment: string;
  menuType: string;
  selectionFilterConfig?: SelectionFilterConfig;
}
