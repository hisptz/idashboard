import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { VisualizationLayer } from '../../models';
import { getVisualizationLayerEntities } from '../reducers/visualization.reducer';

export const getCurrentVisualizationObjectLayers = (layerIds: string[]) =>
  createSelector(
    getVisualizationLayerEntities,
    visualizationLayerEntities =>
      _.filter(
        _.map(
          layerIds || [],
          (layerId: string) => visualizationLayerEntities[layerId]
        ),
        (layer: VisualizationLayer) => layer !== null
      )
  );
