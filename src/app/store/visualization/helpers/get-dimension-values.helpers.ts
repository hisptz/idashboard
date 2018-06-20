import * as _ from 'lodash';

export function getDimensionValues(dimensionArray: any, dataDimensions) {
  const dimensionValues: any[] = [];
  const newDataDimensions: any[] = _.map(dataDimensions, dataDimension => dataDimension.dataElement);
  const readableDimensionValues: any = {};
  if (dimensionArray) {
    dimensionArray.forEach((dimensionObject: any) => {
      if (dimensionObject.dimension !== 'dy') {

        const dimensionValue = {
          name: '',
          value: '',
          items: []
        };

        const currentDataDimension: any = _.find(newDataDimensions, ['id', dimensionObject.dimension]);

        if (currentDataDimension) {
          dimensionValue['options'] = currentDataDimension.optionSet ? currentDataDimension.optionSet.options : [];
        }

        /**
         * Get dimension name
         */
        let dimensionName = dimensionObject.dimension;
        dimensionName += dimensionObject.legendSet ? '-' + dimensionObject.legendSet.id : '';
        dimensionValue.name = dimensionName;

        /**
         * Get dimension items
         */
        dimensionValue.items = _.map(dimensionObject.items, item => {
          return {...item, displayName: dimensionName === 'pe' || dimensionName === 'ou' ?
            _.map(item.displayName.split('_'), nameSection => _.capitalize(nameSection)).join(' ') : item.displayName
          };
        });

        /**
         * Get dimension value
         */
        if (dimensionObject.items) {
          readableDimensionValues[dimensionObject.dimension] = dimensionObject.items.map(item => {
            return {
              id: item.dimensionItem,
              name: item.displayName,
              itemType: item.dimensionItemType
            };
          });

          const itemValues = dimensionObject.items.map(item => {
            return item.dimensionItem ? item.dimensionItem : '';
          }).join(';');
          dimensionValue.value = itemValues !== '' ? itemValues : dimensionObject.filter ? dimensionObject.filter : '';
        }
        dimensionValues.push(dimensionValue);
      }
    });
  }

  return dimensionValues;
}
