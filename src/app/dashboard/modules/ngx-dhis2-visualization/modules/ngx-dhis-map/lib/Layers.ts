import { tileLayer } from './TileLayer';
import { thematic } from './ThematicLayer';
import { boundary } from './BoundaryLayer';
import { facility } from './FacilityLayer';

import { VisualizationLayer } from '../../../models';
import { GeofeatureEntities } from '../models';

export const LayerType = {
  tileLayer,
  thematic,
  boundary,
  facility
};

export const createOverLayLayers = (
  layers: Array<VisualizationLayer>,
  geofeatureEntity: GeofeatureEntities,
  contextPath: string
) => {
  return layers.map(layer =>
    LayerType[layer.layerType](layer, geofeatureEntity[layer.id] && geofeatureEntity[layer.id].geofeatures, contextPath)
  );
};
