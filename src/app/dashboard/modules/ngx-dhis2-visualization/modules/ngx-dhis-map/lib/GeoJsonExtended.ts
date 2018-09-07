import { GeoJSON as LeafletGeoJson, LayerGroup, layerGroup, Util, Map, divIcon, LatLng, CircleMarker } from 'leaflet';
import { GeoJSONOptionsExtended, Dhis2LayerGroup, LayerGroupEvent } from '../models';
import polylabel from 'polylabel';
import * as geojsonArea from '@mapbox/geojson-area';
import { Label } from './Label';
import { Feature, Point } from 'geojson';

export class GeoJSON extends LeafletGeoJson {
  constructor(options: GeoJSONOptionsExtended) {
    super(options.features, Object.assign({}, options, extraOptions));
  }

  addLayer(layer: Dhis2LayerGroup) {
    const { options, feature } = layer;
    if (options.label) {
      this.addLabel(layer, Util.template(options.label, feature.properties));
    }
    super.addLayer(layer);
    return this;
  }

  setOpacity(opacity) {
    this.setStyle({ opacity, fillOpacity: opacity });
  }

  addLabel(layer: Dhis2LayerGroup, text: string) {
    const { options, feature } = layer;
    const { geometry } = feature;
    const labelStyle = { ...options.labelStyle };
    const latlng = this.getLabelLatLng(geometry);
    const _label = new Label(latlng, {
      icon: divIcon({ html: text, className: 'leaflet-div-label', iconSize: null }),
      position: geometry.type === 'Point' ? 'below' : 'middle',
      labelStyle: labelStyle,
      pane: options.labelPane || 'markerPane'
    });
    this.options['_labels'].addLayer(_label);
  }

  onAdd(map: Map) {
    super.onAdd(map);
    map.addLayer(this.options['_labels']);
    this.on('mouseover', this.onMouseOver);
    this.on('mouseout', this.onMouseOut);
    this.fire('ready');
    return this;
  }

  // Set highlight style
  onMouseOver(evt: LayerGroupEvent) {
    evt.layer.setStyle({ weight: 2 });
  }

  // Reset style
  onMouseOut(evt: LayerGroupEvent) {
    if (!evt.layer.feature.isSelected) {
      evt.layer.setStyle({ weight: 1 });
    }
  }

  onRemove(map: Map) {
    super.onRemove(map);
    map.removeLayer(this.options['_labels']);
    this.off('mouseover', this.onMouseOver, this);
    this.off('mouseout', this.onMouseOut, this);
    return this;
  }

  getLabelLatLng(geometry) {
    const { type, coordinates: coords } = geometry;
    let biggestRing;
    if (type === 'Point') {
      return [...coords];
    } else if (type === 'Polygon') {
      biggestRing = coords;
    } else if (type === 'MultiPolygon') {
      biggestRing = coords[0];
      if (coords.length > 1) {
        let biggestSize = 0;
        coords.forEach(ring => {
          const size = geojsonArea.ring(ring[0]); // Area calculation
          if (size > biggestSize) {
            biggestRing = ring;
            biggestSize = size;
          }
        });
      }
    }
    // Returns pole of inaccessibility, the most distant internal point from the polygon outline
    return polylabel(biggestRing, 2).reverse();
  }
}

export const extraOptions = {
  style: feature => {
    const { properties: prop } = feature;
    return {
      color: '#333',
      fillColor: prop.color,
      fillOpacity: prop.opacity,
      opacity: prop.opacity,
      weight: 1,
      fill: prop.fill,
      stroke: true
    };
  },
  _labels: layerGroup(),
  pointToLayer: (geoJsonPoint: Feature<Point>, latlng: LatLng) => {
    const { properties: prop } = geoJsonPoint;
    const geojsonMarkerOptions = {
      radius: prop.radius || 6,
      fillColor: prop.color || '#fff',
      color: prop.color || '#333',
      opacity: prop.opacity || 0.8,
      weight: 1,
      fillOpacity: prop.opacity || 0.8
    };
    return new CircleMarker(latlng, geojsonMarkerOptions);
  }
};

export const geoJsonExtended = options => {
  return new GeoJSON(options);
};
