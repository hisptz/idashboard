import { createAction, props } from '@ngrx/store';
import { VisualizationDataSelection } from '../../modules/ngx-dhis2-visualization/models';
import { Dashboard } from '../../models/dashboard.model';

export const globalFilterChange = createAction(
  '[Global Filter] Global filter change',
  props<{
    dataSelections: VisualizationDataSelection[];
    dashboard: Dashboard;
  }>()
);
