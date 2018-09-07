import * as _ from 'lodash';
import { relativePeriods } from '../constants/periods.constants';
import { getColorsByRgbInterpolation, getLegendItems } from './classify.helper';

export const getValueById = data => {
  const { headers, rows } = data;
  const ouIndex = _.findIndex(headers, ['name', 'ou']);
  const valueIndex = _.findIndex(headers, ['name', 'value']);

  return rows.reduce((obj, row) => {
    obj[row[ouIndex]] = parseFloat(row[valueIndex]);
    return obj;
  }, {});
};

export const getDx = data => {
  const { headers, metaData, rows } = data;
  const { names, pe, dx, dimensions, items } = metaData;
  const dxID = (dx && dx[0]) || (dimensions && dimensions.dx[0]);
  return (names && names[dxID]) || items[dxID].name;
};

export const getOrderedValues = data => {
  const { headers, rows } = data;
  const valueIndex = _.findIndex(headers, ['name', 'value']);

  return rows.map(row => parseFloat(row[valueIndex])).sort((a, b) => a - b);
};

/* DIMENSIONS */

const createDimension = (dimension, items, props) => ({
  dimension,
  items,
  ...props
});

const getDimension = (dimension, arr) => arr.filter(item => item.dimension === dimension)[0];

export const getDimensionItems = (dimension, arr) => {
  const dataItems = getDimension(dimension, arr);
  return dataItems && dataItems.items ? dataItems.items : [];
};

/* DATA ITEMS */

export const getDataItemsFromColumns = (columns = []) => getDimensionItems('dx', columns);

// PERIOD
export const getPeriodFromFilters = (filters = []) => getDimensionItems('pe', filters)[0];

export const getPeriodNameFromId = ({ dimensionItem, displayName }) => {
  const period = relativePeriods.filter(pe => pe.id === dimensionItem)[0];
  return period ? period.name : displayName;
};

//
export const getOrgUnitsFromRows = (rows = []) => getDimensionItems('ou', rows) || [];

export const getFiltersFromColumns = (columns = []) => {
  const filters = columns.filter(item => item.filter);
  return filters.length ? filters : null;
};

export const getFiltersAsText = (filters = []) => {
  return filters.map(({ name, filter }) => {
    const [operator, value] = filter.split(':');
    return `${name} ${getFilterOperatorAsText(operator)} ${value}`;
  });
};

export const getFilterOperatorAsText = id =>
  ({
    EQ: '=',
    GT: '>',
    GE: '>=',
    LT: '<',
    LE: '<=',
    NE: '!=',
    IN: 'one of',
    '!IN': 'not one of',
    LIKE: 'contains',
    '!LIKE': "doesn't contains" // tslint:disable-line
  }[id]);

export const createLegendFromLegendSet = (legendSet, displayName, type) => {
  const { name, legends } = legendSet;
  const pickSome = ['name', 'startValue', 'endValue', 'color'];
  const sortedLegends = _.sortBy(legends, 'startValue');
  const items = sortedLegends.map(legend => _.pick(legend, pickSome));
  return {
    title: name || displayName,
    type,
    items
  };
};

export const createLegendFromConfig = (data, config, displayName, type) => {
  const { method, classes, colorScale, colorLow, colorHigh } = config;

  const items = data.length ? getLegendItems(data, method, classes) : [];

  let colors;

  if (Array.isArray(colorScale)) {
    colors = colorScale;
  } else if (_.isString(colorScale)) {
    colors = colorScale.split(',');
  }

  if (!colorScale || colors.length !== classes) {
    colors = getColorsByRgbInterpolation(colorLow, colorHigh, classes);
  }

  return {
    title: displayName,
    type,
    items: items.map((item, index) => ({
      ...item,
      color: colors[index]
    }))
  };
};
