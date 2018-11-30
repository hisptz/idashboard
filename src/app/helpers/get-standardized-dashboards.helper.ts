import { Dashboard } from '../dashboard/models';
import * as _ from 'lodash';
import { User, SystemInfo } from '../models';
import { getDashboardBookmarkStatus } from './get-dashboard-bookmark-status.helper';

export function getStandardizedDashboards(dashboards: any[], currentUser: User, systemInfo: SystemInfo): Dashboard[] {
  return _.map(dashboards || [], dashboard => {
    const orgUnits =
      currentUser.dataViewOrganisationUnits.length > 0
        ? currentUser.dataViewOrganisationUnits
        : currentUser.organisationUnits;
    return {
      id: dashboard.id,
      name: dashboard.name,
      created: dashboard.created,
      lastUpdated: dashboard.lastUpdated,
      description: dashboard.description,
      supportBookmark: dashboard.hasOwnProperty('favorite'),
      bookmarked: dashboard.hasOwnProperty('favorite')
        ? dashboard.favorite
        : getDashboardBookmarkStatus(dashboard.favorites, currentUser ? currentUser.id : ''),
      access: dashboard.access,
      globalSelections: [
        {
          dimension: 'pe',
          layout: 'rows',
          items: [
            {
              id: 'LAST_YEAR',
              name: 'Last Year',
              ref_type: 'PERIOD_REF'
            },
            {
              id: 'THIS_YEAR',
              name: 'This Year',
              ref_type: 'PERIOD_ACTUAL'
            }
          ]
        },
        {
          dimension: 'ou',
          layout: 'filters',
          items: [
            {
              id: 'USER_ORGUNIT',
              name: 'User Org-unit',
              type: 'USER_ORGANISATION_UNIT'
            },
            {
              id: 'USER_ORGUNIT_CHILDREN',
              name: 'User Sub-units',
              type: 'USER_ORGANISATION_UNIT'
            }
          ]
        }
      ]
    };
  });
}
