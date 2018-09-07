import { toGeoJson, parseFacilities, parseGroupSet } from '../helpers/geofeatureToGeoJson.helper';
import { VisualizationLayer } from '../../../models';
import { Geofeature } from '../models';
import { geoJsonExtended } from './GeoJsonExtended';

export const facility = (layer: VisualizationLayer, geofeatures: Array<Geofeature>, contextPath?: string) => {
  const { config, id, analytics, dataSelections, layerType } = layer;
  const {
    labelFontColor,
    labels,
    labelFontSize,
    labelFontWeight,
    labelFontStyle,
    opacity,
    organisationUnitGroupSet,
    legendSet,
    name,
    displayName,
    method,
    radiusHigh,
    radiusLow,
    classes,
    colorLow,
    colorHigh,
    areaRadius
  } = config;

  const { id: groupSetId, organisationUnitGroups } = organisationUnitGroupSet;
  const facilities = parseFacilities(geofeatures, groupSetId);
  const ouGroupEntity = parseGroupSet(organisationUnitGroups);

  const features = toGeoJson(facilities, false, opacity, contextPath, groupSetId, ouGroupEntity);

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
  const bounds = geojsonLayer.getBounds();
  return {
    geojsonLayer,
    labels,
    id,
    bounds: bounds.isValid() ? bounds : null
  };
};
