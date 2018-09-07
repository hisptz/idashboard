import { Marker, Util } from 'leaflet';

export class Label extends Marker {
  constructor(latlng, options) {
    super(latlng, options);
  }

  onAdd(map) {
    super.onAdd(map);
    const options: any = this.options;
    const iconDiv = this['_icon'];

    if (options.labelStyle) {
      Util.extend(iconDiv.style, options.labelStyle);
    }
    iconDiv.style.marginLeft = '-' + iconDiv.offsetWidth / 2 + 'px';

    if (options.position !== 'below') {
      iconDiv.style.marginTop = '-' + iconDiv.offsetHeight / 2 + 'px';
    }

    return this;
  }
}
