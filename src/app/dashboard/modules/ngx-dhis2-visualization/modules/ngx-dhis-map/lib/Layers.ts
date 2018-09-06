import { tileLayer } from './TileLayer';
import { thematic } from './Thematic';
import { boundary } from './Boundary';

import { VisualizationLayer } from '../../../models';
import { GeofeatureEntities } from '../models';

export const LayerType = {
  tileLayer,
  thematic,
  boundary
};

export const createOverLayLayers = (layers: Array<VisualizationLayer>, geofeatureEntity: GeofeatureEntities) => {
  return layers.map(layer =>
    LayerType[layer.layerType](layer, geofeatureEntity[layer.id] && geofeatureEntity[layer.id].geofeatures)
  );
};
