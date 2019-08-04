import { createSelector } from '@ngrx/store';

import { getMergedGlobalDataSelectionsFromVisualizationLayers } from '../../helpers/get-merged-global-data-selections.helper';
import { Dashboard } from '../../models/dashboard.model';
import { VisualizationDataSelection } from '../../modules/ngx-dhis2-visualization/models';
import {
  getVisualizationLayerEntities,
  getVisualizationObjectEntities
} from '../../modules/ngx-dhis2-visualization/store/reducers/visualization.reducer';
import { getCurrentDashboard } from './dashboard-selectors';

export const getCurrentGlobalDataSelections = createSelector(
  getCurrentDashboard,
  getVisualizationObjectEntities,
  getVisualizationLayerEntities,
  (dashboard: Dashboard) => {
    const dataSelectionsArray: Array<VisualizationDataSelection[]> = (dashboard
      ? dashboard.dashboardItems
      : []
    ).map((dashboardItem: any) => dashboardItem.dataSelections);
    return getMergedGlobalDataSelectionsFromVisualizationLayers(
      dataSelectionsArray
    );
  }
);
