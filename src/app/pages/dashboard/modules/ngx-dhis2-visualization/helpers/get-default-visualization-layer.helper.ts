import * as _ from 'lodash';

import { VisualizationLayer } from '../models';

export function getDefaultVisualizationLayer(
  currentUser,
  systemInfo,
  selectedFunctions?: any[]
): VisualizationLayer {
  if (!currentUser || !systemInfo) {
    return null;
  }

  const orgUnits =
    currentUser.dataViewOrganisationUnits.length > 0
      ? currentUser.dataViewOrganisationUnits
      : currentUser.organisationUnits;

  const dxItems = _.filter(
    _.map(selectedFunctions || [], (selectedFunction: any) => {
      const selectedRules = _.filter(
        selectedFunction.rules || [],
        (rule: any) => rule.selected
      );
      const selectedRule = selectedRules[0]
        ? selectedRules[0]
        : selectedFunction.rules && selectedFunction.rules[0]
        ? selectedFunction.rules[0]
        : null;

      return selectedRule
        ? {
            id: selectedRule.id,
            name: selectedRule.name,
            ruleDefinition: selectedRule,
            functionObject: {
              id: selectedFunction.id,
              functionString: selectedFunction.function
            },
            type: 'FUNCTION_RULE'
          }
        : null;
    }),
    dxItem => dxItem !== null
  );

  return {
    id: '',
    config: {
      name: 'Untitled',
      type: 'COLUMN'
    },
    dataSelections: _.filter(
      [
        dxItems.length > 0
          ? {
              dimension: 'dx',
              name: 'Data',
              layout: 'columns',
              items: dxItems
            }
          : null,
        {
          dimension: 'pe',
          name: 'Period',
          layout: 'rows',
          items: [
            {
              id: systemInfo.analysisRelativePeriod,
              name: systemInfo.analysisRelativePeriod
            }
          ]
        },
        {
          dimension: 'ou',
          layout: 'filters',
          name: 'Organisation Unit',
          items: [
            {
              id: orgUnits[0] ? orgUnits[0].id : '',
              name: orgUnits[0] ? orgUnits[0].name : ''
            }
          ]
        }
      ],
      dataSelection => dataSelection !== null
    )
  };
}
