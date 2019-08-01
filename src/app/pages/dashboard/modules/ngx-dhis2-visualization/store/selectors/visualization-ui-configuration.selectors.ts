import { createSelector } from '@ngrx/store';

import { getFocusedVisualizationState } from '../reducers/visualization-ui-configuration.reducer';
import {
  getVisualizationUiConfigurationEntities,
  getVisualizationUiConfigurationState
} from '../reducers/visualization.reducer';

export const getCurrentVisualizationUiConfig = (visualizationId: string) =>
  createSelector(
    getVisualizationUiConfigurationEntities,
    visualizationUiConfigurationEntities =>
      visualizationUiConfigurationEntities[visualizationId]
  );

export const getFocusedVisualization = createSelector(
  getVisualizationUiConfigurationState,
  getFocusedVisualizationState
);
