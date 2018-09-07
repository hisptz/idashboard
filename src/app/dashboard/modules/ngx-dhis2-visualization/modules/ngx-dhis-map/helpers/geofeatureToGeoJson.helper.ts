import * as _ from 'lodash';

export const isValidCoordinate = coord =>
  Array.isArray(coord) &&
  coord.length === 2 &&
  coord[0] >= -180 &&
  coord[0] <= 180 &&
  coord[1] >= -90 &&
  coord[1] <= 90;

export const toGeoJson = (
  organisationUnits,
  fill?: boolean,
  opacity: number = 0.8,
  contextPath?: string,
  ouGroupSetId?: string,
  ouGroupEntity?
) =>
  _.sortBy(organisationUnits, 'le')
    .map(ou => {
      const coord = JSON.parse(ou.co);
      let gpid = '';
      let gppg = '';
      let type = 'Point';

      if (ou.ty === 2) {
        type = 'Polygon';
        if (ou.co.substring(0, 4) === '[[[[') {
          type = 'MultiPolygon';
        }
      }

      // Grand parent
      if (_.isString(ou.pg) && ou.pg.length) {
        const ids: string[] = _.compact(ou.pg.split('/'));

        // Grand parent id
        if (ids.length >= 2) {
          gpid = ids[ids.length - 2];
        }

        // Grand parent parent graph
        if (ids.length > 2) {
          gppg = '/' + ids.slice(0, ids.length - 2).join('/');
        }
      }
      const groupId = ou.dimensions && ou.dimensions[ouGroupSetId];

      const group = ouGroupEntity && groupId && ouGroupEntity[groupId];

      return {
        type: 'Feature',
        id: ou.id,
        geometry: {
          type: type,
          coordinates: coord
        },
        properties: {
          id: ou.id,
          name: ou.na,
          fill: fill,
          hasCoordinatesDown: ou.hcd,
          hasCoordinatesUp: ou.hcu,
          level: ou.le,
          opacity,
          grandParentParentGraph: gppg,
          grandParentId: gpid,
          parentGraph: ou.pg,
          parentId: ou.pi,
          parentName: ou.pn,
          value: null,
          color: null,
          label: group ? `${ou.na} (${group.name})` : null,
          icon:
            contextPath && group
              ? {
                  iconUrl: `${contextPath}/images/orgunitgroup/${group.symbol}`,
                  iconSize: [16, 16]
                }
              : null,
          radius: null,
          dx: null,
          percentage: null
        }
      };
    })
    .filter(({ geometry }) => Array.isArray(geometry.coordinates) && geometry.coordinates.length);

export const toFacilityGeoJson = (data, group, contextPath) => ({
  type: 'Feature',
  id: data.id,
  properties: {
    id: data.id,
    name: data.na,
    label: `${data.na} (${group.name})`,
    icon: {
      iconUrl: `${contextPath}/images/orgunitgroup/${group.symbol}`,
      iconSize: [16, 16]
    }
  },
  geometry: {
    type: 'Point',
    coordinates: JSON.parse(data.co)
  }
});

export const parseFacilities = (facilities, groupSetId) =>
  facilities.filter(
    data =>
      data.ty === 1 &&
      _.isPlainObject(data.dimensions) &&
      data.dimensions[groupSetId] &&
      isValidCoordinate(JSON.parse(data.co))
  );

export const parseGroupSet = organisationUnitGroups =>
  organisationUnitGroups.reduce((symbols = {}, group, index) => {
    // Easier lookup of unit group symbols
    const symbol = group.symbol || 21 + index + '.png'; // Default symbol 21-25 are coloured circles
    return {
      ...symbols,
      [group.id]: {
        ...group,
        symbol
      }
    };
  }, {});
