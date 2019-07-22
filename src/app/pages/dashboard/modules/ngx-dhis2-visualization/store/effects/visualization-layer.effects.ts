import { Injectable } from '@angular/core';
import {
  getFunctionLoadedStatus,
  getFunctions
} from '@iapps/ngx-dhis2-data-filter';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap, mergeMap } from 'rxjs/operators';

import {
  checkIfVisualizationIsNonVisualizable,
  getMergedDataSelections,
  getSanitizedAnalytics,
  getStandardizedAnalyticsObject,
  getVisualizationLayersFromFavorite,
  prepareVisualizationLayersForAnalytics
} from '../../helpers';
import { VisualizationLayer } from '../../models';
import { AnalyticsService } from '../../services/analytics.service';
import { loadFavoriteFail, updateFavorite } from '../actions/favorite.actions';
import {
  LoadVisualizationAnalyticsAction,
  LoadVisualizationAnalyticsSuccessAction,
  UpdateVisualizationLayerAction,
  VisualizationLayerActionTypes,
  AddVisualizationLayersAction
} from '../actions/visualization-layer.actions';
import { UpdateVisualizationObjectAction } from '../actions/visualization-object.actions';
import { VisualizationState } from '../reducers/visualization.reducer';
import { getCombinedVisualizationObjectById } from '../selectors';

@Injectable()
export class VisualizationLayerEffects {
  updateFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFavorite),
      mergeMap(
        ({ favorite, visualizationId, visualizationType, systemInfo }) => {
          const visualizationLayers = getVisualizationLayersFromFavorite(
            favorite,
            visualizationType
          );

          return [
            new AddVisualizationLayersAction(visualizationLayers),
            new LoadVisualizationAnalyticsAction(
              visualizationId,
              visualizationLayers
            )
          ];
        }
      )
    )
  );

  loadFavoriteFails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavoriteFail),
      map(
        ({ visualizationId, error }) =>
          new UpdateVisualizationObjectAction(visualizationId, {
            progress: {
              statusCode: error.statusCode || error.status,
              statusText: 'Error',
              percent: 100,
              message: error.message
            }
          })
      )
    )
  );

  @Effect({ dispatch: false })
  loadAnalytics$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationLayerActionTypes.LOAD_VISUALIZATION_ANALYTICS),
    tap((action: LoadVisualizationAnalyticsAction) => {
      this.store
        .select(getCombinedVisualizationObjectById(action.visualizationId))
        .pipe(take(1))
        .subscribe((visualizationObject: any) => {
          if (visualizationObject) {
            // Update visualization object
            this.store.dispatch(
              new UpdateVisualizationObjectAction(action.visualizationId, {
                progress: {
                  statusCode: 200,
                  statusText: 'OK',
                  percent: 0,
                  message: `Loading Data for ${visualizationObject.name}`
                }
              })
            );
            if (
              !checkIfVisualizationIsNonVisualizable(
                visualizationObject.currentType
              )
            ) {
              this.store
                .select(getFunctionLoadedStatus)
                .pipe(
                  filter((loaded: boolean) => loaded),
                  switchMap(() => this.store.select(getFunctions())),
                  take(1)
                )
                .subscribe((functions: any[]) => {
                  const functionRules = _.flatten(
                    _.map(functions, functionObject => functionObject.items)
                  );

                  const visualizationLayers: VisualizationLayer[] = prepareVisualizationLayersForAnalytics(
                    action.globalSelections
                      ? _.map(
                          visualizationObject.layers,
                          (visualizationLayer: VisualizationLayer) => {
                            return {
                              ...visualizationLayer,
                              dataSelections: getMergedDataSelections(
                                visualizationLayer.dataSelections,
                                action.globalSelections,
                                visualizationObject.currentType
                              )
                            };
                          }
                        )
                      : action.visualizationLayers,
                    functionRules
                  );

                  forkJoin(
                    ...visualizationLayers.map(
                      (visualizationLayer: VisualizationLayer) =>
                        this.analyticsService.getAnalytics(
                          visualizationLayer.dataSelections,
                          visualizationLayer.layerType,
                          {
                            ...visualizationLayer.config,
                            visualizationType: action.type
                          }
                        )
                    )
                  ).subscribe(
                    analyticsResponse => {
                      // Save visualizations layers
                      _.each(analyticsResponse, (analytics, analyticsIndex) => {
                        this.store.dispatch(
                          new LoadVisualizationAnalyticsSuccessAction(
                            visualizationLayers[analyticsIndex].id,
                            {
                              analytics: getSanitizedAnalytics(
                                getStandardizedAnalyticsObject(analytics, true),
                                visualizationLayers[analyticsIndex]
                                  .dataSelections
                              ),
                              dataSelections:
                                visualizationLayers[analyticsIndex]
                                  .dataSelections
                            }
                          )
                        );
                      });
                      // Update visualization object
                      this.store.dispatch(
                        new UpdateVisualizationObjectAction(
                          action.visualizationId,
                          {
                            progress: {
                              statusCode: 200,
                              statusText: 'OK',
                              percent: 100,
                              message: 'Analytics loaded'
                            }
                          }
                        )
                      );
                    },
                    error => {
                      this.store.dispatch(
                        new UpdateVisualizationObjectAction(
                          action.visualizationId,
                          {
                            progress: {
                              statusCode: error.status,
                              statusText: 'Error',
                              percent: 100,
                              message: error.message
                            }
                          }
                        )
                      );
                    }
                  );
                });
            } else {
              _.each(
                _.map(
                  action.visualizationLayers,
                  (visualizationLayer: VisualizationLayer) => {
                    return {
                      ...visualizationLayer,
                      dataSelections: getMergedDataSelections(
                        visualizationLayer.dataSelections,
                        action.globalSelections,
                        visualizationObject.type
                      )
                    };
                  }
                ),
                visualizationLayer => {
                  this.store.dispatch(
                    new UpdateVisualizationLayerAction(
                      visualizationLayer.id,
                      visualizationLayer
                    )
                  );
                }
              );
            }
          } else {
            _.each(action.visualizationLayers, visualizationLayer => {
              this.store.dispatch(
                new UpdateVisualizationLayerAction(
                  visualizationLayer.id,
                  visualizationLayer
                )
              );
            });
          }
        });
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<VisualizationState>,
    private analyticsService: AnalyticsService
  ) {}
}
