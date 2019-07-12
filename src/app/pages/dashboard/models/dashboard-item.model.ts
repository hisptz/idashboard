import { Visualization } from '../modules/ngx-dhis2-visualization/models';
import { BaseState } from 'src/app/store/states/base.state';

export interface DashboardItem {
  id: string;
  created?: string;
  lastUpdated?: string;
  type: string;
  height?: number;
  width?: number;
  gridColumn?: string;
  gridRow?: string;
  shape?: string;
  x?: number;
  y?: number;
  appKey?: string;
  interpretationCount?: number;
  visualizationLayers?: any[];
  currentType?: string;
  chart?: { id: string; name?: string };
  reportTable?: { id: string; name?: string };
  map?: { id: string; name?: string };
  eventReport?: { id: string; name?: string };
  visualization?: Visualization;
  notification: BaseState;
}
