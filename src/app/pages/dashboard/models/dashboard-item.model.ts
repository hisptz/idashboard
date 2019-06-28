export interface DashboardItem {
  id: string;
  type: string;
  height?: number;
  width?: number;
  gridColumn?: string;
  gridRow?: string;
  shape?: string;
  x?: number;
  y?: number;
  interpretationCount?: number;
  visualizationLayers?: any[];
  currentType?: string;
  chart?: { id: string; name?: string };
  reportTable?: { id: string; name?: string };
  map?: { id: string; name?: string };
  eventReport?: { id: string; name?: string };
}
