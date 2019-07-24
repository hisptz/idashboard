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
import { getSanitizedDataSelections } from '../../modules/ngx-dhis2-visualization/helpers/get-favorite-from-layers.helpers';
import {
  updateFavorite,
  updateFavoriteSelections
} from '../../modules/ngx-dhis2-visualization/store/actions/favorite.actions';

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
                // TODO This logic should be handled by configurations
                const newDataSelections =
                  visualization.type === 'CHART'
                    ? dataSelections.filter(
                        (dataSelection: VisualizationDataSelection) =>
                          dataSelection.dimension !== 'vrg'
                      )
                    : dataSelections;

                const groupedDataSelections = groupBy(
                  newDataSelections,
                  'layout'
                );

                if (visualization.favorite) {
                  this.store.dispatch(
                    updateFavoriteSelections({
                      id: visualization.favorite.id,
                      changes: {
                        columns: getSanitizedDataSelections(
                          groupedDataSelections['columns'],
                          visualization.type
                        ),
                        rows: getSanitizedDataSelections(
                          groupedDataSelections['rows'],
                          visualization.type
                        ),
                        filters: getSanitizedDataSelections(
                          groupedDataSelections['filters'],
                          visualization.type
                        )
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
