import { DEFAULT_LEGENDS } from '../constants/default-legend';
import * as _ from 'lodash';
import { Legend, LegendSet } from '../models/legend-set';

export function getLegendSetsConfiguration(
  selectedItems,
  functionRulesObject,
  legendSetEntities,
  visualizationLayerId
) {
  return _.sortBy(
    _.map(selectedItems, selectedItem => {
      const index = _.indexOf(selectedItems, selectedItem) + 1;
      const dimensionItemId = selectedItem.id;
      const id = `${visualizationLayerId}_${dimensionItemId}`;
      const legends =
        legendSetEntities && legendSetEntities[id]
          ? legendSetEntities && legendSetEntities[id].legends
          : [];
      const name =
        functionRulesObject[selectedItem.id] &&
        functionRulesObject[selectedItem.id].name
          ? functionRulesObject[selectedItem.id].name
          : 'Item ' + index;
      return { id, visualizationLayerId, dimensionItemId, name, legends };
    }),
    ['name']
  );
}

export function getLegendSetForUpdate(legendSets: LegendSet[]) {
  const filteredegendSets = _.filter(
    legendSets,
    (legendSet: LegendSet) => legendSet.legends.length > 0
  );
  return filteredegendSets;
}

export function getNewLegend(legends: Legend[]): Legend {
  legends = _.reverse(_.sortBy(legends, 'startValue'));
  const startValue = legends && legends.length > 0 ? legends[0].endValue : 0;
  const endValue = parseInt(startValue, 10) + 20;
  return {
    id: getUniqueId(),
    name: 'Untitled',
    color: '#fff',
    startValue: startValue,
    endValue: endValue
  };
}

export function getDefaultLegends() {
  return _.sortBy(
    _.map(DEFAULT_LEGENDS, legend => {
      legend.id = getUniqueId();
      return legend;
    }),
    'startValue'
  );
}

export function getUniqueId(): string {
  let uid = '';
  const possible_combinations =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 11; i++) {
    uid += possible_combinations.charAt(
      Math.floor(Math.random() * possible_combinations.length)
    );
  }
  return uid;
}
