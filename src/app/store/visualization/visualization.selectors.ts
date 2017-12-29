import * as _ from 'lodash';
import {AppState} from '../app.reducers';
import {createSelector} from '@ngrx/store';
import {getCurrentDashboard} from '../dashboard/dashboard.selectors';
import {Visualization, VisualizationState} from './visualization.state';
import {Dashboard} from '../dashboard/dashboard.state';

const visualizationState = (state: AppState) => state.visualization;

export const getCurrentDashboardVisualizationObjects = createSelector(visualizationState, getCurrentDashboard,
  (visualization: VisualizationState, currentDashboard: Dashboard) =>
    _.filter(visualization.visualizationObjects, (visualizationObject: Visualization) =>
      visualizationObject.dashboardId === currentDashboard.id));

export const getVisualizationObjectsLoadingProgress = createSelector(getCurrentDashboardVisualizationObjects,
  (visualizationObjects: Visualization[]) => {
    if (visualizationObjects.length === 0) {
      return {
        totalItems: 0,
        loadedItems: 0,
        progress: 0
      };
    }

    const totalItems = visualizationObjects.length;
    const loadedVisualizations: Visualization[] = visualizationObjects
      .filter(visualizationObject => visualizationObject.details.loaded);
    const loadingVisualizations: Visualization[] = visualizationObjects
      .filter(visualizationObject => !visualizationObject.details.loaded);
    const lastVisualizationObject: Visualization = _.last(loadingVisualizations);
    const loadedItems = loadedVisualizations.length;
    const progressMessage = lastVisualizationObject ? 'Loading ' + lastVisualizationObject.name : 'Loading Dashboards';
    return {
      totalItems: totalItems,
      loadedItems: loadedItems,
      progressMessage: progressMessage,
      progress: calculateProgress(loadedItems, totalItems)
    };
  });


function calculateProgress(loaded, total) {
  return total === 0 ? 0 : ((loaded / total) * 100).toFixed(0);
}
