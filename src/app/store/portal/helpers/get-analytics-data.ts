import { visualizationStructure} from '../../../pages/portal/models/visualization-structure';

export function formatAnalyticsResult(data) {
  visualizationStructure.id = data.metaData.dimensions.dx[0] + 'P';
  visualizationStructure.details.currentVisualization = 'CHART';
  console.log(visualizationStructure.details.filters[0].filters.length);
  console.log('visualizationStructure', visualizationStructure);
  return data;
}
