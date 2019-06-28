import { DashboardAccess } from './dashboard-access.model';
import { DashboardItem } from './dashboard-item.model';

export interface Dashboard {
  id: string;
  name: string;
  created?: string;
  lastUpdated?: string;
  description?: string;
  favorite: boolean;
  bookmarkPending?: boolean;
  supportBookmark?: boolean;
  access?: DashboardAccess;
  addingItem?: boolean;
  hasNewUnsavedFavorite?: boolean;
  creating?: boolean;
  updating?: boolean;
  showDeleteDialog?: boolean;
  deleting?: boolean;
  saving?: boolean;
  updatedOrCreated?: boolean;
  error?: any;
  namespace?: string;
  unSaved?: boolean;
  publicAccess: string;
  externalAccess: boolean;
  userGroupAccesses: any[];
  dashboardItems: DashboardItem[];
  userAccesses: any[];
  user: {
    id: string;
    name: string;
  };
}
