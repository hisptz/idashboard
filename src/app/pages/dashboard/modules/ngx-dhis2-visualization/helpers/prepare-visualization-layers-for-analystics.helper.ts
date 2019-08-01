import { VisualizationLayer, VisualizationDataSelection } from '../models';
import * as _ from 'lodash';

export function prepareVisualizationLayersForAnalytics(
  visualizationLayers: VisualizationLayer[],
  functionRules: any[]
) {
  return _.map(
    visualizationLayers,
    (visualizationLayer: VisualizationLayer) => {
      const dataSelections: VisualizationDataSelection[] = _.map(
        visualizationLayer.dataSelections,
        (dataSelection: VisualizationDataSelection) => {
          switch (dataSelection.dimension) {
            case 'dx': {
              return {
                ...dataSelection,
                items: _.map(dataSelection.items, (item: any) => {
                  if (item.type === 'FUNCTION_RULE') {
                    const functionRule = _.find(functionRules, ['id', item.id]);
                    return functionRule
                      ? { ...functionRule, type: item.type }
                      : item;
                  }
                  return item;
                })
              };
            }
            default:
              return dataSelection;
          }
        }
      );
      return { ...visualizationLayer, dataSelections };
    }
  );
}
