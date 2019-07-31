import { camelCase, flatten, some, filter, find } from 'lodash';

import { VisualizationDataSelection } from '../models';
import { DataSelectionPreferences } from '../models/data-selection-preferences.model';
import { FavoritePreferences } from '../models/favorite-preferences.model';
import { USER_ORG_UNITS, OrgUnit } from '@iapps/ngx-dhis2-org-unit-filter';

export function getSanitizedDataSelections(
  dataSelections: VisualizationDataSelection[],
  visualizationType: string,
  dataSelectionPreferences: DataSelectionPreferences = {}
): VisualizationDataSelection[] {
  const favoritePreferences = dataSelectionPreferences
    ? dataSelectionPreferences[visualizationType]
    : null;

  return getDimensionSanitizedDataSelections(
    removeExcludedDimensions(
      dataSelections,
      favoritePreferences ? favoritePreferences.dimensionsToExclude : []
    ),
    favoritePreferences
  );
}

function getDimensionSanitizedDataSelections(
  dataSelections: VisualizationDataSelection[],
  favoritePreferences: FavoritePreferences
): VisualizationDataSelection[] {
  return (dataSelections || []).map(
    (dataSelection: VisualizationDataSelection) => {
      switch (dataSelection.dimension) {
        case 'pe': {
          return getPeriodSanitizedDataSelection(
            dataSelection,
            favoritePreferences
          );
        }

        case 'ou': {
          return getOrgUnitSanitizedDataSelection(
            dataSelection,
            favoritePreferences
          );
        }

        default:
          return dataSelection;
      }
    }
  );
}

function getPeriodSanitizedDataSelection(
  dataSelection: VisualizationDataSelection,
  favoritePreferences: FavoritePreferences
): VisualizationDataSelection {
  if (favoritePreferences && favoritePreferences.useLowestPeriodType) {
    return {
      ...dataSelection,
      items: flatten(
        dataSelection.items.map(
          (item: any) =>
            item[camelCase(dataSelection.lowestPeriodType)] || [item]
        )
      )
    };
  }

  return dataSelection;
}

function getOrgUnitSanitizedDataSelection(
  dataSelection: VisualizationDataSelection,
  favoritePreferences: FavoritePreferences
): VisualizationDataSelection {
  // exclude orgunits children
  if (favoritePreferences && favoritePreferences.excludeOrgUnitChildren) {
    return {
      ...dataSelection,
      items: excludeOrgUnitChildren(dataSelection.items)
    };
  }

  // include orgunit children
  if (favoritePreferences && favoritePreferences.includeOrgUnitChildren) {
    return {
      ...dataSelection,
      items: excludeOrgUnitChildren(dataSelection.items)
    };
  }

  return dataSelection;
}

function excludeOrgUnitChildren(orgUnitItems: any[]) {
  // exclude children level if any
  if (orgUnitItemsHasLevels(orgUnitItems)) {
    return filter(
      orgUnitItems,
      (item: any) => item.type && item.type.indexOf('LEVEL') === -1
    );
  }

  // exclude user orgunit children if any
  if (orgUnitItemsHasUserOrgUnitChildren(orgUnitItems)) {
    const userOrgUnit: OrgUnit = find(USER_ORG_UNITS, ['id', 'USER_ORGUNIT']);

    if (!userOrgUnit) {
      return [];
    }

    const { id, name, type, level } = userOrgUnit;

    return [{ id, name, type, level }];
  }

  return orgUnitItems;
}

function orgUnitItemsHasLevels(orgUnitItems: any[]) {
  return some(
    orgUnitItems,
    (item: any) => item.type && item.type.indexOf('LEVEL') !== -1
  );
}

function orgUnitItemsHasUserOrgUnitChildren(orgUnitItems: any[]) {
  return some(
    orgUnitItems,
    (item: any) => item.id && item.id.indexOf('CHILDREN') !== -1
  );
}

function includeOrgUnitChildren(orgUnitItems: any[]) {}

function removeExcludedDimensions(
  dataSelections: VisualizationDataSelection[],
  dimensionsToExclude: string[]
): VisualizationDataSelection[] {
  return (dataSelections || []).filter(
    (dataSelection: VisualizationDataSelection) =>
      !(dimensionsToExclude || []).includes(dataSelection.dimension)
  );
}
