import * as _ from 'lodash';
import { getSelectionDimensionsFromFavorite } from './get-selection-dimensions-from-favorite.helper';
import { getVisualizationLayerType } from './get-visualization-layer-type.helper';
export function getVisualizationLayersFromFavorite(
  favoriteObject: any,
  visualizationType: string
) {
  return _.map(
    favoriteObject.mapViews || [favoriteObject],
    (favoriteLayer: any) => {
      const dataSelections = getSelectionDimensionsFromFavorite(favoriteLayer);
      return {
        id: favoriteLayer.id,
        dataSelections,
        layerType: getVisualizationLayerType(visualizationType, favoriteLayer),
        analytics: null,
        config: {
          ...favoriteLayer,
          type: favoriteLayer.type ? favoriteLayer.type : 'COLUMN',
          visualizationType
        }
      };
    }
  );
}
