import { toGeoJson } from '../helpers/geofeatureToGeoJson.helper';
import { VisualizationLayer } from '../../../models';
import { Geofeature } from '../models';
import { geoJsonExtended } from './GeoJsonExtended';
import {
  getValueById,
  getDx,
  getOrderedValues,
  createLegendFromLegendSet,
  createLegendFromConfig,
  getPeriodNameFromId,
  getPeriodFromFilters
} from '../helpers/analytics.helper';
import { getLegendItemForValue, defaultColorScale } from '../helpers/classify.helper';
import * as _ from 'lodash';

export const thematic = (layer: VisualizationLayer, geofeatures: Array<Geofeature>) => {
  const { config, id, analytics, dataSelections, layerType } = layer;
  const {
    labelFontColor,
    labels,
    labelFontSize,
    labelFontWeight,
    labelFontStyle,
    opacity,
    legendSet,
    name,
    displayName,
    method,
    radiusHigh,
    radiusLow,
    classes,
    colorScale = defaultColorScale,
    colorLow,
    colorHigh
  } = config;
  const features = toGeoJson(geofeatures, true, opacity);
  const hasAnalytics = analytics ? true : false;
  let valueFeatures;

  if (hasAnalytics) {
    const valueById = getValueById(analytics);
    const layerDx = getDx(analytics);
    valueFeatures = features.filter(({ id: featureId }) => valueById[featureId] !== undefined);
    const orderedValues = getOrderedValues(analytics);
    const minValue = orderedValues[0];
    const maxValue = orderedValues[orderedValues.length - 1];
    const valueFrequencyPair = _.countBy(orderedValues);
    const legendProperties = { method, classes, colorScale, colorLow, colorHigh };
    const legend = legendSet
      ? createLegendFromLegendSet(legendSet, displayName, layerType)
      : createLegendFromConfig(orderedValues, legendProperties, displayName, layerType);
    legend.items.forEach(item => (item.count = 0));
    const getLegendItem = _.curry(getLegendItemForValue)(legend.items);
    const period = getPeriodFromFilters(dataSelections);
    legend['period'] = getPeriodNameFromId(period);
    valueFeatures.forEach(({ id: featureId, properties }) => {
      const value = valueById[featureId];
      const item = getLegendItem(value);
      if (item) {
        item.count++;
        properties.percentage = ((item.count / orderedValues.length) * 100).toFixed(1);
      }
      properties.value = value;
      properties.label = name;
      properties.dx = layerDx;
      properties.color = item && item.color;
      properties.radius = ((value - minValue) / (maxValue - minValue)) * (radiusHigh - radiusLow) + radiusLow;
    });
  }

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

  const options = { features: valueFeatures || features, ...labelOption };
  const geojsonLayer = geoJsonExtended(options);
  return {
    geojsonLayer,
    labels,
    id
  };
};
