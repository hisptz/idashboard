import { getVisualizationConfigurationEntities } from '../reducers/visualization.reducer';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  Visualization,
  VisualizationConfig,
  VisualizationUiConfig,
  VisualizationLayer,
  VisualizationLayout
} from '../../models';

export const getCurrentVisualizationConfig = (visualizationId: string) =>
  createSelector(
    getVisualizationConfigurationEntities,
    visualizationConfigurationEntities =>
      visualizationConfigurationEntities[visualizationId]
  );
