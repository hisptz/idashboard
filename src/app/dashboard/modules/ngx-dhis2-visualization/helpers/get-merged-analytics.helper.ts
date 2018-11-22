import * as _ from 'lodash';

export function getMergedAnalytics(splitedAnalyticsArray: any[]) {
  /**
   * Check if analytics array is supplied and return null if not
   */
  if (!splitedAnalyticsArray) {
    return null;
  }

  /**
   * Check if analytics layer has only one item and return analytics item
   */
  if (splitedAnalyticsArray && splitedAnalyticsArray.length < 2) {
    return splitedAnalyticsArray[0] || null;
  }

  let mergedHeaders = [];
  const mergedMetadata = {};
  let allAnalyticsRows = [];
  splitedAnalyticsArray.forEach(analytics => {
    const { headers, metaData, rows } = analytics;
    if (headers.length > mergedHeaders.length) {
      mergedHeaders = headers;
    }
    const metaDataKeys = Object.keys(metaData);
    metaDataKeys.forEach(key => {
      const keyValues = metaData[key];
      if (isObject(keyValues)) {
        mergedMetadata[key] = { ...mergedMetadata[key], ...keyValues };
      } else {
        const values = mergedMetadata[key]
          ? key === 'pe' && !keyValues.includes('ref_actule_pe')
            ? [...keyValues, ...mergedMetadata[key]]
            : [...mergedMetadata[key], ...keyValues]
          : keyValues;

        mergedMetadata[key] = values.filter((item, pos, mergedArray) => mergedArray.indexOf(item) === pos);
      }
    });
    const analyticRows = rows.map(row =>
      Object.assign({}, ...row.map((item, index) => ({ [headers[index].name]: item })))
    );

    allAnalyticsRows = [...allAnalyticsRows, ...analyticRows];
  });

  const mergedRows = allAnalyticsRows.map(row => mergedHeaders.map(header => row[header.name] || ''));
  return {
    headers: mergedHeaders,
    metaData: mergedMetadata,
    rows: mergedRows
  };
}

const isObject = a => {
  return !!a && a.constructor === Object;
};
