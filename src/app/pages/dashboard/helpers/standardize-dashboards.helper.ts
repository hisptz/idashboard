import * as _ from 'lodash';
import { standardizeDashboard } from './standardize-dashboard.helper';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Dashboard } from '../models/dashboard.model';

export function standardizeDashboards(
  dashboards: any[],
  currentUser: User
): Dashboard[] {
  return (dashboards || []).map(dashboard =>
    standardizeDashboard(dashboard, currentUser)
  );
}
