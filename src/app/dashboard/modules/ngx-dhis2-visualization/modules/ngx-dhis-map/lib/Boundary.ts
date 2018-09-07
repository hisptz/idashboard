import { toGeoJson } from '../helpers/geofeatureToGeoJson.helper';
import { VisualizationLayer } from '../../../models';
import { Geofeature } from '../models';
import { geoJsonExtended } from './GeoJsonExtended';

export const boundary = (layer: VisualizationLayer, geofeatures: Array<Geofeature>) => {
  const { config, id } = layer;
  const { labelFontColor, labels, labelFontSize, labelFontWeight, labelFontStyle, opacity } = config;
  const features = toGeoJson(geofeatures, false, opacity);

  // incase there is label here is the font style
  const labelOption = {
    label: labels ? '{name}' : undefined,
    labelPane: `${id}-labels`,
    labelStyle: {
      fontSize: labelFontSize,
      color: labelFontColor,
      fontStyle: labelFontStyle,
      fontColor: labelFontColor,
      fontWeight: labelFontWeight
    }
  };
  const options = { features, ...labelOption };
  const geojsonLayer = geoJsonExtended(options);

  return {
    geojsonLayer,
    labels,
    id
  };
};
