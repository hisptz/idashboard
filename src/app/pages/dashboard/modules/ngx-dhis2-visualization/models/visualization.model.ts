import { VisualizationFavorite } from './visualization-favorite.model';
import { VisualizationProgress } from './visualization-progress.model';
import { VisualizationNotification } from './visualization-notification.model';
import { VisualizationUiConfig } from './visualization-ui-config.model';
import { VisualizationConfig } from './visualization-config.model';

export interface Visualization {
  id: string;
  name: string;
  type?: string;
  currentType?: string;
  uiConfig: VisualizationUiConfig;
  globalConfig?: VisualizationConfig;
  favorite?: VisualizationFavorite;
  created?: string;
  lastUpdated?: string;
  description?: string;
  visualizationConfigId?: string;
  progress?: VisualizationProgress;
  layers?: Array<string>;
  isNew?: boolean;
  appKey?: string;
  notification?: VisualizationNotification;
  isNonVisualizable?: boolean;
}
