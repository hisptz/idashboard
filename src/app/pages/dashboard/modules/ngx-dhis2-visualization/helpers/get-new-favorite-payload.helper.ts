import { VisualizationDataSelection } from '../models';
import { User, SystemInfo } from '@iapps/ngx-dhis2-http-client';
import { USER_ORG_UNITS } from '@iapps/ngx-dhis2-org-unit-filter';

export function getNewFavoritePayload(payload: {
  currentUser: User;
  systemInfo: SystemInfo;
  type: string;
  id: string;
  config?: any;
}) {
  if (!payload) {
    return null;
  }

  const { type, config, id, systemInfo, currentUser } = payload;
  switch (type) {
    case 'chart': {
      return {
        id,
        rows: {
          dimensionItem: 'dx',
          items: []
        },
        columns: {
          dimensionItem: 'ou',
          items: getDefaultOrgUnits(currentUser)
        },
        filters: {
          dimensionItem: 'pe',
          items: systemInfo
            ? [
                {
                  id: systemInfo.keyAnalysisRelativePeriod
                }
              ]
            : []
        },

        ...getFavoriteOptionsByType(config || {}, type)
      };
    }
  }
}

export function getDefaultOrgUnits(
  currentUser: User,
  startWithDynamicOrgUnits: boolean = true
) {
  if (startWithDynamicOrgUnits && USER_ORG_UNITS && USER_ORG_UNITS[0]) {
    const { id, name, type } = USER_ORG_UNITS[0];
    return [{ id, name, type }];
  }
  const { dataViewOrganisationUnits, organisationUnits } = currentUser;
  return (dataViewOrganisationUnits.length > 0
    ? dataViewOrganisationUnits
    : organisationUnits
  ).map((orgUnit: any) => {
    return {
      ...orgUnit,
      type: 'ORGANISATION_UNIT'
    };
  });
}

function getFavoriteOptionsByType(favoriteDetails: any, favoriteType: string) {
  switch (favoriteType) {
    case 'chart': {
      return {
        type: favoriteDetails.type || 'COLUMN',
        name: favoriteDetails.name || 'Untitled',
        title: favoriteDetails.title || null,
        description: favoriteDetails.description || '',
        prototype: favoriteDetails.prototype || {},
        percentStackedValues: favoriteDetails.percentStackedValues || false,
        cumulativeValues: favoriteDetails.cumulativeValues || false,
        hideEmptyRowItems: favoriteDetails.hideEmptyRowItems || 'NONE',
        regressionType: favoriteDetails.regressionType || 'NONE',
        completedOnly: favoriteDetails.completedOnly || false,
        targetLineValue: favoriteDetails.targetLineValue || null,
        baseLineValue: favoriteDetails.baseLineValue || null,
        sortOrder: favoriteDetails.sortOrder || 0,
        aggregationType: favoriteDetails.aggregationType || 'DEFAULT',
        rangeAxisMaxValue: favoriteDetails.rangeAxisMaxValue || null,
        rangeAxisMinValue: favoriteDetails.rangeAxisMinValue || null,
        rangeAxisSteps: favoriteDetails.rangeAxisSteps || null,
        rangeAxisDecimals: favoriteDetails.rangeAxisDecimals || null,
        noSpaceBetweenColumns: favoriteDetails.noSpaceBetweenColumns || false,
        hideLegend: favoriteDetails.hideLegend || false,
        hideTitle: favoriteDetails.hideTitle || false,
        hideSubtitle: favoriteDetails.hideSubtitle || false,
        subtitle: favoriteDetails.subtitle || null,
        reportParams: favoriteDetails.reportParams || {},
        showData: favoriteDetails.showData || true,
        targetLineLabel: favoriteDetails.targetLineLabel || null,
        baseLineLabel: favoriteDetails.baseLineLabel || null,
        domainAxisLabel: favoriteDetails.domainAxisLabel || null,
        rangeAxisLabel: favoriteDetails.rangeAxisLabel || null
      };
    }
    case 'TABLE': {
      return favoriteDetails;
    }
    default:
      return {};
  }
}
