export interface TileLayer {
  name: string;
  type: string;
  label: string;
  maxZoom: number;
  url: string;
  attribution: string;
  image: string;
  baseLayer: boolean;
  visible: boolean;
}
