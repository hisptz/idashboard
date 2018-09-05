import { TileLayer as LeafletTileLayer } from 'leaflet';
import { TileLayer } from '../models';

const errorTileUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`; // tslint:disable-line

export const tileLayer = (options: TileLayer): LeafletTileLayer => {
  return new LeafletTileLayer(options.url, { ...options, errorTileUrl });
};
