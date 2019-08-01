import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { globalFilterChange } from '../actions/global-filter.actions';
import { tap, concatMap, withLatestFrom, take } from 'rxjs/operators';
import {
  VisualizationDataSelection,
  VisualizationVm,
  Visualization
} from '../../modules/ngx-dhis2-visualization/models';
import { intersection } from 'lodash';
import { of, zip } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getCurrentDashboard } from '../selectors/dashboard-selectors';
import { DashboardItem } from '../../models/dashboard-item.model';
import {
  getVisualizationObjectById,
  getCombinedVisualizationObjectById
} from '../../modules/ngx-dhis2-visualization/store/selectors';
import { LoadVisualizationAnalyticsAction } from '../../modules/ngx-dhis2-visualization/store/actions';
import { groupBy } from 'lodash';
import {
  updateFavorite,
  updateFavoriteSelections
} from '../../modules/ngx-dhis2-visualization/store/actions/favorite.actions';
import { camelCase, flatten, reverse } from 'lodash';
import { updateDataSelectionBasedOnPreferences } from '../../modules/ngx-dhis2-visualization/helpers';
import { updateDashboard } from '../actions/dashboard.actions';
import { getSanitizedDataSelections } from '../../modules/ngx-dhis2-visualization/helpers/get-sanitized-data-selections.helper';

@Injectable()
export class GlobalFilterEffects {
  globalFilterChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(globalFilterChange),
        tap(({ dataSelections, dashboard }) => {
          // validate filter
          // TODO Refactor this code
          const requiredDimensions = ['dx', 'pe', 'ou', 'vrg'];

          const filterIntersection = intersection(
            dataSelections.map(
              (dataSelection: VisualizationDataSelection) =>
                dataSelection.dimension
            ),
            requiredDimensions
          );

          if (requiredDimensions.length === filterIntersection.length) {
            zip(
              ...(dashboard.dashboardItems || []).map(
                (dashboardItem: DashboardItem) =>
                  this.store
                    .pipe(
                      select(
                        getCombinedVisualizationObjectById(dashboardItem.id)
                      )
                    )
                    .pipe(take(1))
              )
            ).subscribe((visualizations: Visualization[]) => {
              visualizations.forEach((visualization: Visualization) => {
                // TODO Logic for using child periods based on selected has to be handled by configuration
                const newDataSelections = getSanitizedDataSelections(
                  dataSelections,
                  camelCase(visualization.type),
                  {
                    reportTable: { includeOrgUnitChildren: true },
                    chart: {
                      excludeOrgUnitChildren: true,
                      useLowestPeriodType: true,
                      dimensionsToExclude: ['vrg']
                    },
                    app: {
                      useLowestPeriodType: true
                    }
                  }
                );

                this.store.dispatch(
                  updateDashboard({
                    dashboard: {
                      ...dashboard,
                      dashboardItems: (dashboard.dashboardItems || []).map(
                        (dashboardItem: DashboardItem) => {
                          return {
                            ...dashboardItem,
                            dataSelections
                          };
                        }
                      )
                    }
                  })
                );

                const groupedDataSelections = groupBy(
                  newDataSelections,
                  'layout'
                );

                if (visualization.favorite) {
                  this.store.dispatch(
                    updateFavoriteSelections({
                      id: visualization.favorite.id,
                      changes: {
                        columns: groupedDataSelections['columns'],
                        rows: groupedDataSelections['rows'],
                        filters: groupedDataSelections['filters']
                      }
                    })
                  );
                }

                this.store.dispatch(
                  new LoadVisualizationAnalyticsAction(
                    visualization.id,
                    visualization.layers,
                    newDataSelections
                  )
                );
              });
            });
          }
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private store: Store<State>) {}
}
