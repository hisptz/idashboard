import { GeoJSON as LeafletGeoJson, LayerGroup, layerGroup, Util, Map } from 'leaflet';
import { GeoJSONOptionsExtended, Dhis2LayerGroup } from '../models';
import polylabel from 'polylabel';
import * as geojsonArea from '@mapbox/geojson-area';
import { Label } from './Label';

export class GeoJSON extends LeafletGeoJson {
  protected _labels: LayerGroup;
  constructor(options: GeoJSONOptionsExtended) {
    super(options.features, Object.assign({}, options, { _labels: layerGroup() }));
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
      html: text,
      position: geometry.type === 'Point' ? 'below' : 'middle',
      labelStyle: labelStyle,
      pane: options.labelPane || 'markerPane'
    });
    options._labels.addLayer(_label);
  }

  onAdd(map: Map) {
    super.onAdd(map);
    this.on('mousover', this.onMouseOver, this);
    this.on('mousout', this.onMouseOut, this);
    this.fire('ready');
    return this;
  }

  // Set highlight style
  onMouseOver(evt) {
    evt.layer.setStyle({ weight: 2 });
  }

  // Reset style
  onMouseOut(evt) {
    if (!evt.layer.feature.isSelected) {
      evt.layer.setStyle({ weight: 1 });
    }
  }

  onRemove(map: Map) {
    super.onRemove(map);
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

export const geoJsonExtended = options => {
  return new GeoJSON(options);
};
