export interface Geofeature {
  id: string;
  code: string;
  na: string;
  hcd: boolean;
  hcu: boolean;
  le: number;
  pg: string;
  pi: string;
  pn: string;
  ty: number;
  co: string;
}

export interface LayerGeofeature {
  id: string;
  geofeatures: Array<Geofeature>;
}
