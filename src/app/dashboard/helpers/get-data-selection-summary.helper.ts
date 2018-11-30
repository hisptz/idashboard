import { VisualizationDataSelection } from '../modules/ngx-dhis2-visualization/models';
import { generateCorrespondingFixedPeriodArray } from '../modules/ngx-dhis2-visualization/helpers';
import { User, OrgUnitLevel } from '../../models';
import * as _ from 'lodash';
export function getDataSelectionSummary(dataSelections: VisualizationDataSelection[]) {
  const ouDimension = _.find(dataSelections, ['dimension', 'ou']);
  const ouSection = (_.head(ouDimension ? ouDimension.items : []) || { name: '' }).name;
  const peDimension = _.find(dataSelections, ['dimension', 'pe']);
  const peSection = _.uniq(
    _.filter(
      [
        (_.head(peDimension ? peDimension.items : []) || { name: '' }).name,
        (_.last(peDimension ? peDimension.items : []) || { name: '' }).name
      ],
      peName => peName !== undefined || peName !== ''
    )
  ).join(' - ');
  return ouSection !== '' && peSection !== '' ? ouSection + ' - ' + peSection : '';
}

export const getOuSelectionSummary = (
  dataSelections: VisualizationDataSelection[],
  user: User,
  orgUnitLevels: OrgUnitLevel[]
) => {
  const ouDimensionItems = dataSelections.find(({ dimension }) => dimension === 'ou').items;

  const userOrgUnit = user.organisationUnits[0];

  const ouNames = ouDimensionItems
    .map(({ id, name }) => {
      if (id === 'USER_ORGUNIT') {
        return userOrgUnit.name;
      } else if (id === 'USER_ORGUNIT_CHILDREN') {
        const child_level = orgUnitLevels.find(({ level }) => level === userOrgUnit.level + 1);
        const child_name = child_level ? `${child_level.name} in ${userOrgUnit.name}` : undefined;
        return child_name;
      } else if (id === 'USER_ORGUNIT_GRANDCHILDREN') {
        const grand_child_level = orgUnitLevels.find(({ level }) => level === userOrgUnit.level + 2);
        const grand_child_name = grand_child_level ? `${grand_child_level.name} in ${userOrgUnit.name}` : undefined;
        return grand_child_name;
      } else {
        return name;
      }
    })
    .filter(name => name);

  return ouNames.length <= 5
    ? `${ouNames.join(',')}`
    : `${ouNames.slice(0, 5).join(',')} and ${ouNames.length - 5} more`;
};

export const getPeSelectionSummary = (dataSelections: VisualizationDataSelection[]) => {
  const peDimensionItems = dataSelections.find(({ dimension }) => dimension === 'pe').items;
  const refPeriod = generateCorrespondingFixedPeriodArray(
    peDimensionItems.filter(({ ref_type }) => ref_type === 'PERIOD_REF')
  );
  const actualPeriod = generateCorrespondingFixedPeriodArray(
    peDimensionItems.filter(({ ref_type }) => ref_type === 'PERIOD_ACTUAL')
  );
  return `Reference Period: ${formatPeriodTorepresentedFormat(
    refPeriod
  )} - Actual Period: ${formatPeriodTorepresentedFormat(actualPeriod)}`;
};

const formatPeriodTorepresentedFormat = (period = []) => {
  const [firstPeriod, lastPeriod] = [period[0], period[period.length - 1]];
  if (period.length > 1) {
    return `${firstPeriod.displayName || firstPeriod.name} to ${lastPeriod.displayName || lastPeriod.name}`;
  } else {
    return firstPeriod.displayName || firstPeriod.name;
  }
};
