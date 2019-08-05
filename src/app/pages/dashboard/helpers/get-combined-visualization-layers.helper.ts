import { map as _map, flatten as _flatten } from 'lodash';

export function getCombinedVisualizationLayers(
  dashboardVisualizationItems: any[],
  visualizationObjectEntities: any,
  visualizationLayerEntities: any
) {
  return _map(
    _flatten(
      _map(
        _flatten(
          _map(
            dashboardVisualizationItems,
            (dashboardVisualizationItem: any) =>
              visualizationObjectEntities[dashboardVisualizationItem.id]
          )
        ),
        visualization => visualization.layers
      )
    ),
    layerId => visualizationLayerEntities[layerId]
  );
}
