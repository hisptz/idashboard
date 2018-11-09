export interface LegendSet {
  id: string;
  name: string;
  dimensionItemId: string;
  visualizationLayerId: string;
  legends: Legend[];
}

export interface Legend {
  id: string;
  endValue: any;
  color: string;
  name: string;
  startValue: any;
}
