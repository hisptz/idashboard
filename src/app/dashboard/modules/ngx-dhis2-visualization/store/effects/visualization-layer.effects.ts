import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { tap, withLatestFrom, take } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

// reducers
import { VisualizationState } from '../reducers';

// actions
import {
  VisualizationLayerActionTypes,
  LoadVisualizationAnalyticsAction,
  LoadVisualizationAnalyticsSuccessAction,
  UpdateVisualizationLayerAction
} from '../actions/visualization-layer.actions';

import { UpdateVisualizationObjectAction } from '../actions/visualization-object.actions';

// services
import { AnalyticsService } from '../../services/analytics.service';

// helpers
import { getStandardizedAnalyticsObject, getSanitizedAnalytics } from '../../helpers';
import { Visualization } from '../../models';
import { getVisualizationObjectById } from '../selectors';
import { State, getFunctionById, getFunctionRuleEntityState } from '../../../../../store';
import { FUNCTION_NAMESPACE } from '../../../../constants/namespace.constants';

@Injectable()
export class VisualizationLayerEffects {
  constructor(
    private actions$: Actions,
    private store: Store<VisualizationState>,
    private rootStore: Store<State>,
    private analyticsService: AnalyticsService
  ) {}

  @Effect({ dispatch: false })
  loadAnalytics$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationLayerActionTypes.LOAD_VISUALIZATION_ANALYTICS),
    withLatestFrom(
      this.rootStore.select(getFunctionById(FUNCTION_NAMESPACE)),
      this.rootStore.select(getFunctionRuleEntityState)
    ),
    tap(([action, functionObject, functionRuleEntitiesState]: [LoadVisualizationAnalyticsAction, any, any]) => {
      const { entities: functionRuleEntities } = functionRuleEntitiesState;
      this.store
        .select(getVisualizationObjectById(action.visualizationId))
        .pipe(take(1))
        .subscribe((visualizationObject: Visualization) => {
          if (!visualizationObject.isNonVisualizable) {
            this.store.dispatch(
              new UpdateVisualizationObjectAction(action.visualizationId, {
                progress: {
                  statusCode: 200,
                  statusText: 'OK',
                  percent: 50,
                  message: 'Favorite information has been loaded'
                }
              })
            );

            forkJoin(
              _.map(action.visualizationLayers, visualizationLayer => {
                const dxSelection = visualizationLayer.dataSelections.find(({ dimension }) => dimension === 'dx');
                const otherSelections = visualizationLayer.dataSelections.filter(({ dimension }) => dimension !== 'dx');
                const items = dxSelection.items.map(({ id, name, type }) => ({
                  id,
                  name,
                  type: functionRuleEntities[id] ? 'FUNCTION_RULE' : type,
                  ruleDefinition: functionRuleEntities[id],
                  functionObject
                }));
                const dataSelectionFormated = [...otherSelections, { ...dxSelection, items }];
                return this.analyticsService.getAnalytics(
                  dataSelectionFormated,
                  visualizationLayer.layerType,
                  visualizationLayer.config
                );
              })
            ).subscribe(
              analyticsResponse => {
                // Save visualizations layers
                _.each(analyticsResponse, (analytics, analyticsIndex) => {
                  // console.log({ analytics });
                  this.store.dispatch(
                    new LoadVisualizationAnalyticsSuccessAction(action.visualizationLayers[analyticsIndex].id, {
                      analytics: getSanitizedAnalytics(
                        getStandardizedAnalyticsObject(analytics, true),
                        action.visualizationLayers[analyticsIndex].dataSelections
                      ),
                      dataSelections: action.visualizationLayers[analyticsIndex].dataSelections
                    })
                  );
                });
                // Update visualization object
                this.store.dispatch(
                  new UpdateVisualizationObjectAction(action.visualizationId, {
                    progress: {
                      statusCode: 200,
                      statusText: 'OK',
                      percent: 100,
                      message: 'Analytics loaded'
                    }
                  })
                );
              },
              error => {
                this.store.dispatch(
                  new UpdateVisualizationObjectAction(action.visualizationId, {
                    progress: {
                      statusCode: error.httpStatusCode,
                      statusText: error.status || error.statusText,
                      percent: 100,
                      message: error.message
                    }
                  })
                );
              }
            );
          } else {
            _.each(action.visualizationLayers, visualizationLayer => {
              this.store.dispatch(new UpdateVisualizationLayerAction(visualizationLayer.id, visualizationLayer));
            });
          }
        });
    })
  );
}
