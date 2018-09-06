import { Marker, divIcon, LatLng, latLng, Map } from 'leaflet';

export class Label extends Marker {
  private _latlng: LatLng;
  constructor(latlng, options) {
    super(latlng, options);
    this._latlng = latLng(latlng);
  }

  onAdd(map: Map) {
    const options = this.options;
    const iconDiv = divIcon({ html: 'Label', className: 'leaflet-div-label', iconSize: null });
    console.log(options);
    return super.onAdd(map);
  }
}
