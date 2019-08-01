import { camelCase, flatten, some, filter, find, min, map } from 'lodash';

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
      items: includeOrgUnitChildren(dataSelection.items)
    };
  }

  return dataSelection;
}

function excludeOrgUnitChildren(orgUnitItems: any[]) {
  let newOrgUnitItems = [...orgUnitItems];

  // exclude children level if any
  if (orgUnitItemsHasLevels(orgUnitItems)) {
    newOrgUnitItems = filter(
      orgUnitItems,
      (item: any) => item.type && item.type.indexOf('LEVEL') === -1
    );
  }

  // exclude user orgunit children if any but include user orgunit if not available
  if (orgUnitItemsHasUserOrgUnitChildren(newOrgUnitItems)) {
    const userOrgUnit: OrgUnit = find(USER_ORG_UNITS, ['id', 'USER_ORGUNIT']);

    if (!userOrgUnit) {
      newOrgUnitItems = [];
    }

    newOrgUnitItems = filter(
      newOrgUnitItems,
      (item: any) => item.id && item.id.indexOf('CHILDREN') === -1
    );

    const { id, name, type, level } = userOrgUnit;

    newOrgUnitItems = [...newOrgUnitItems, { id, name, type, level }];
  }

  return newOrgUnitItems;
}

function includeOrgUnitChildren(orgUnitItems: any[]) {
  if (
    !orgUnitItemsHasLevels(orgUnitItems) ||
    !orgUnitItemsHasUserOrgUnitChildren(orgUnitItems)
  ) {
    const lowestOrgUnitLevel = getLowestSelectedLevel(orgUnitItems);

    if (lowestOrgUnitLevel) {
      const nextOrgUnitLevel = lowestOrgUnitLevel + 1;
      return [
        ...orgUnitItems,
        { id: `LEVEL-${nextOrgUnitLevel}`, name: `Level ${nextOrgUnitLevel}` }
      ];
    } else {
      const userChildrenOrgUnit: OrgUnit = find(USER_ORG_UNITS, [
        'id',
        'USER_ORGUNIT_CHILDREN'
      ]);

      const { id, name, type, level } = userChildrenOrgUnit;

      return [{ id, name, type, level }];
    }
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

function getLowestSelectedLevel(orgUnitItems: any[]) {
  return min(filter(map(orgUnitItems, (item: any) => item.level)));
}

function removeExcludedDimensions(
  dataSelections: VisualizationDataSelection[],
  dimensionsToExclude: string[]
): VisualizationDataSelection[] {
  return (dataSelections || []).filter(
    (dataSelection: VisualizationDataSelection) =>
      !(dimensionsToExclude || []).includes(dataSelection.dimension)
  );
}
