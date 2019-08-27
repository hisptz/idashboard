import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import {
  concatMap,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';

import {
  getSelectionDimensionsFromFavorite,
  getVisualizationLayerType
} from '../../helpers';
import { getDefaultVisualizationLayer } from '../../helpers/get-default-visualization-layer.helper';
import { getFavoritePayload } from '../../helpers/get-favorite-payload.helpers';
import { VisualizationLayer, VisualizationVm } from '../../models';
import {
  AddVisualizationLayerAction,
  AddVisualizationLayersAction,
  addVisualizationObject,
  initializeVisualizationObject,
  LoadVisualizationAnalyticsAction,
  LoadVisualizationFavoriteSuccessAction,
  RemoveVisualizationConfigurationAction,
  RemoveVisualizationLayerAction,
  RemoveVisualizationObjectAction,
  RemoveVisualizationUiConfigurationAction,
  SaveVisualizationFavoriteAction,
  UpdateVisualizationConfigurationAction,
  UpdateVisualizationObjectAction,
  VisualizationObjectActionTypes
} from '../actions';
import { loadFavorite } from '../actions/favorite.actions';
import {
  getVisualizationObjectEntities,
  VisualizationState
} from '../reducers/visualization.reducer';
import { getCombinedVisualizationObjectById } from '../selectors';

@Injectable()
export class VisualizationObjectEffects {
  initializeVisualization$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initializeVisualizationObject),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(
              this.store.pipe(select(getVisualizationObjectEntities))
            )
          )
        ),
        tap(
          ([
            {
              visualizationObject,
              currentUser,
              systemInfo,
              visualizationLayers,
              isNew
            },
            visualizationObjectEntities
          ]) => {
            const availableVisualization: VisualizationVm =
              visualizationObjectEntities[visualizationObject.id];

            // add visualization object if not available in store
            if (!availableVisualization) {
              this.store.dispatch(
                addVisualizationObject({
                  visualizationObject: {
                    ...visualizationObject,
                    globalConfig: { contextPath: systemInfo['contextPath'] }
                  },
                  visualizationLayers,
                  systemInfo,
                  currentUser,
                  isNew
                })
              );
            }
          }
        )
      ),
    { dispatch: false }
  );

  addVisualizationObject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addVisualizationObject),
        tap(
          ({
            visualizationObject,
            visualizationLayers,
            isNew,
            currentUser,
            systemInfo
          }) => {
            if (visualizationObject.favorite) {
              this.store.dispatch(
                loadFavorite({
                  favorite: visualizationObject.favorite,
                  favoriteType: _.camelCase(visualizationObject.type),
                  visualizationId: visualizationObject.id,
                  visualizationType: visualizationObject.type,
                  currentUser,
                  systemInfo,
                  isNew
                })
              );
            } else {
              this.store.dispatch(
                new AddVisualizationLayersAction(visualizationLayers)
              );
            }
          }
        )
      ),
    { dispatch: false }
  );

  @Effect({ dispatch: false })
  loadFavoriteSuccess$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.LOAD_VISUALIZATION_FAVORITE_SUCCESS),
    withLatestFrom(this.httpClient.systemInfo()),
    tap(
      ([action, systemInfo]: [LoadVisualizationFavoriteSuccessAction, any]) => {
        const spatialSupport =
          systemInfo && systemInfo.databaseInfo
            ? systemInfo.databaseInfo.spatialSupport
            : false;
        const visualizationFavoriteOptions =
          action.visualization && action.visualization.favorite
            ? action.visualization.favorite
            : null;

        if (visualizationFavoriteOptions && action.favorite) {
          if (visualizationFavoriteOptions.requireAnalytics) {
            // update global visualization configurations
            this.store.dispatch(
              new UpdateVisualizationConfigurationAction(
                action.visualization.visualizationConfigId,
                {
                  basemap: action.favorite.basemap,
                  zoom: action.favorite.zoom,
                  latitude: action.favorite.latitude,
                  longitude: action.favorite.longitude
                }
              )
            );

            // generate visualization layers
            const visualizationLayers: VisualizationLayer[] = _.map(
              action.favorite.mapViews || [action.favorite],
              (favoriteLayer: any) => {
                const dataSelections = getSelectionDimensionsFromFavorite(
                  favoriteLayer
                );
                return {
                  id: favoriteLayer.id,
                  dataSelections,
                  layerType: getVisualizationLayerType(
                    action.visualization.favorite.type,
                    favoriteLayer
                  ),
                  analytics: null,
                  config: {
                    ...favoriteLayer,
                    type: favoriteLayer.type ? favoriteLayer.type : 'COLUMN',
                    displayNameProperty: 'SHORTNAME',
                    spatialSupport,
                    visualizationType: action.visualization.type
                  }
                };
              }
            );

            // Add visualization Layers
            _.each(visualizationLayers, visualizationLayer => {
              this.store.dispatch(
                new AddVisualizationLayerAction(visualizationLayer)
              );
            });

            // Update visualization object
            this.store.dispatch(
              new UpdateVisualizationObjectAction(action.visualization.id, {
                layers: _.map(
                  visualizationLayers,
                  visualizationLayer => visualizationLayer.id
                ),
                progress: {
                  statusCode: 200,
                  statusText: 'OK',
                  percent: 50,
                  message: 'Favorite information has been loaded'
                }
              })
            );

            // Load analytics for visualization layers
            this.store.dispatch(
              new LoadVisualizationAnalyticsAction(
                action.visualization.id,
                visualizationLayers
              )
            );
          } else {
            const visualizationLayers: VisualizationLayer[] = _.map(
              [action.favorite],
              favoriteLayer => {
                return {
                  id: favoriteLayer.id,
                  analytics: {
                    rows: favoriteLayer[visualizationFavoriteOptions.type]
                  }
                };
              }
            );

            // Update visualization object
            this.store.dispatch(
              new UpdateVisualizationObjectAction(action.visualization.id, {
                layers: _.map(
                  visualizationLayers,
                  visualizationLayer => visualizationLayer.id
                ),
                progress: {
                  statusCode: 200,
                  statusText: 'OK',
                  percent: 100,
                  message: 'Information has been loaded'
                }
              })
            );

            // Add visualization Layers
            _.each(visualizationLayers, visualizationLayer => {
              this.store.dispatch(
                new AddVisualizationLayerAction(visualizationLayer)
              );
            });
          }
        } else {
          // Update visualization layers
          const visualizationLayer: VisualizationLayer = {
            ...getDefaultVisualizationLayer(
              action.currentUser,
              action.systemInfo
            ),
            id: generateUid()
          };
          this.store.dispatch(
            new AddVisualizationLayerAction(visualizationLayer)
          );
          // Update visualization object
          this.store.dispatch(
            new UpdateVisualizationObjectAction(action.visualization.id, {
              layers: [visualizationLayer.id],
              progress: {
                statusCode: 200,
                statusText: 'OK',
                percent: 100,
                message: 'Information has been loaded'
              }
            })
          );
        }
      }
    )
  );

  @Effect({ dispatch: false })
  saveVisualizationFavorite$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.SaveVisualizationFavorite),
    tap((action: SaveVisualizationFavoriteAction) => {
      this.store
        .select(getCombinedVisualizationObjectById(action.id))
        .pipe(take(1))
        .subscribe((visualizationObject: any) => {
          // Update visualization object
          this.store.dispatch(
            new UpdateVisualizationObjectAction(action.id, {
              name: action.favoriteDetails.name,
              description: action.favoriteDetails.description,
              favorite: {
                ...visualizationObject.favorite,
                name: action.favoriteDetails.name
              }
            })
          );

          // Get updated visualization layer based on new changes
          const visualizationLayers: VisualizationLayer[] = _.map(
            visualizationObject.layers,
            visualizationLayer => {
              return {
                ...visualizationLayer,
                config: {
                  ...(visualizationLayer.config || {}),
                  ...action.favoriteDetails
                }
              };
            }
          );

          // Get favorite payload details
          const favoriteDetails = getFavoritePayload(
            visualizationLayers,
            visualizationObject.type,
            visualizationObject.config.currentType
          );
        });
    })
  );

  @Effect()
  removeVisualizationObject$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.RemoveVisualizationObject),
    switchMap((action: RemoveVisualizationObjectAction) => [
      new RemoveVisualizationConfigurationAction(action.id),
      new RemoveVisualizationLayerAction(action.id),
      new RemoveVisualizationUiConfigurationAction(action.id)
    ])
  );

  constructor(
    private actions$: Actions,
    private store: Store<VisualizationState>,
    private httpClient: NgxDhis2HttpClientService
  ) {}
}
