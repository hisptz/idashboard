import { visualizationStructure} from '../../../pages/portal/models/visualization-structure';
import * as _ from 'lodash';

export function formatAnalyticsResult(data) {
  const periods = [];
  data.metaData.dimensions['pe'].forEach((period) => {
    periods.push(period);
  });
  visualizationStructure.id = data.metaData.dimensions.dx[0];
  visualizationStructure.name = data.metaData.items[visualizationStructure.id].name
  visualizationStructure.details.currentVisualization = 'CHART';
  visualizationStructure.details.filters[0].id = visualizationStructure.id;
  visualizationStructure.details.filters[0].filters[0].name = 'pe'
  visualizationStructure.details.filters[0].filters[0].value = periods.join(';')

  periods.forEach((period) => {
    const filterItem1 = {
      'id': period,
      'dimensionItem': period,
      'displayName': period,
      'dimensionItemType': 'PERIOD'
    }
    visualizationStructure.details.filters[0].filters[0].items.push(filterItem1);
  })
  visualizationStructure.details.filters[0].filters[1].name = 'dx'
  visualizationStructure.details.filters[0].filters[1].value = visualizationStructure.id
  const filterItem2 = {
    'id': data.metaData.dimensions['dx'][0],
    'dimensionItem': data.metaData.dimensions['ou'][0],
    'displayName': data.metaData.items[data.metaData.dimensions['dx'][0]].name,
    'dimensionItemType': 'INDICATOR'
  };
  visualizationStructure.details.filters[0].filters[1].items.push(filterItem2)

  visualizationStructure.details.filters[0].filters[2].name = 'ou';
  visualizationStructure.details.filters[0].filters[2].value = data.metaData.dimensions['ou'][0]
  const filterItem = {
    'id': data.metaData.dimensions['ou'][0],
    'dimensionItem': data.metaData.dimensions['ou'][0],
    'displayName': data.metaData.items[data.metaData.dimensions['ou'][0]].name,
    'dimensionItemType': 'ORGANISATION_UNIT'
  }
  visualizationStructure.details.filters[0].filters[2].items.push(filterItem)

  visualizationStructure.details.metadataIdentifiers[0] = data.metaData.dimensions.dx[0];
  const visualizationLayerSettings = visualizationStructure.layers[0]['settings'];
  visualizationLayerSettings.columns['dimension'] = 'dx';
  visualizationLayerSettings.columns['items'] = visualizationStructure.details.filters[0].filters[1].items;
  visualizationLayerSettings.filters['dimension'] = 'ou';
  visualizationLayerSettings.filters['items'] = visualizationStructure.details.filters[0].filters[2].items

  _.map(visualizationStructure ? visualizationStructure.layers : [], (visualizationLayers, index) => {
    const OU_HEADER = {
      name: 'ou',
      column: 'Organization Unit',
      valueType: 'TEXT',
      type: 'java.lang.String',
      hidden: false,
      meta: true
    }
    if (visualizationLayers && visualizationLayers['analytics']) {
      visualizationLayers['analytics']['headers'] = (_.concat(data.headers, OU_HEADER));

      visualizationLayers['analytics']['metaData']['names'] = (_.concat(data.metaData.items));

      visualizationLayers['analytics']['metaData']['dx'] = (_.concat(data.metaData.dimensions.dx));

      visualizationLayers['analytics']['metaData']['ou'] = (_.concat(data.metaData.dimensions.ou));

      visualizationLayers['analytics']['metaData']['co'] = (_.concat(data.metaData.dimensions.co));
      visualizationLayers['analytics']['metaData']['pe'] = (_.concat(data.metaData.dimensions.pe));
      visualizationLayers['analytics']['rows'] = (_.concat(data.rows));
    }
    visualizationStructure.layers[0]['analytics'] = visualizationLayers['analytics'];
    visualizationStructure.layers[0]['settings'] = visualizationLayerSettings;
    visualizationStructure.layers[0]['filters'] = visualizationStructure.details.filters[0].filters;

  });

  // console.log('visualizationStructure', visualizationStructure);
  return data;
}
