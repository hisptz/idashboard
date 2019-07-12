import { Injectable } from '@angular/core';
import {
  SystemInfoService,
  NgxDhis2HttpClientService
} from '@iapps/ngx-dhis2-http-client';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import {
  getSelectionDimensionsFromFavorite,
  getStandardizedVisualizationType,
  getVisualizationLayerType
} from '../../helpers';
import { getDefaultVisualizationLayer } from '../../helpers/get-default-visualization-layer.helper';
import { getFavoritePayload } from '../../helpers/get-favorite-payload.helpers';
import { Visualization, VisualizationLayer } from '../../models';
import { FavoriteService } from '../../services/favorite.service';
import {
  AddVisualizationLayerAction,
  AddVisualizationLayersAction,
  AddVisualizationObjectAction,
  InitializeVisualizationObjectAction,
  LoadVisualizationAnalyticsAction,
  LoadVisualizationFavoriteAction,
  LoadVisualizationFavoriteSuccessAction,
  RemoveVisualizationConfigurationAction,
  RemoveVisualizationFavoriteAction,
  RemoveVisualizationLayerAction,
  RemoveVisualizationObjectAction,
  RemoveVisualizationUiConfigurationAction,
  SaveVisualizationFavoriteAction,
  SaveVisualizationFavoriteSuccessAction,
  UpdateVisualizationConfigurationAction,
  UpdateVisualizationLayerAction,
  UpdateVisualizationObjectAction,
  VisualizationObjectActionTypes
} from '../actions';
import {
  getVisualizationObjectEntities,
  VisualizationState
} from '../reducers/visualization.reducer';
import { getCombinedVisualizationObjectById } from '../selectors';
import { generateUid } from 'src/app/core/helpers/generate-uid.helper';

@Injectable()
export class VisualizationObjectEffects {
  @Effect({ dispatch: false })
  initializeVisualizationObject$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.INITIALIZE_VISUALIZATION_OBJECT),
    withLatestFrom(this.store.select(getVisualizationObjectEntities)),
    tap(
      ([action, visualizationObjectEntities]: [
        InitializeVisualizationObjectAction,
        any
      ]) => {
        const visualizationObject: Visualization =
          visualizationObjectEntities[action.visualizationObject.id];

        if (!visualizationObject) {
          // Set visualization object
          this.store.dispatch(
            new AddVisualizationObjectAction({
              ...action.visualizationObject,
              layers: (action.visualizationObject.layers || []).map(
                (layer: VisualizationLayer) => layer.id
              )
            })
          );

          // Set visualization layers
          this.store.dispatch(
            new AddVisualizationLayersAction(action.visualizationObject.layers)
          );

          // Load analytics for visualization layers
          this.store.dispatch(
            new LoadVisualizationAnalyticsAction(
              action.visualizationObject.id,
              action.visualizationObject.layers
            )
          );
        }
      }
    )
  );

  @Effect()
  loadFavorite$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.LOAD_VISUALIZATION_FAVORITE),
    mergeMap((action: LoadVisualizationFavoriteAction) =>
      this.favoriteService.getFavorite(action.visualization.favorite).pipe(
        map(
          (favorite: any) =>
            new LoadVisualizationFavoriteSuccessAction(
              action.visualization,
              favorite,
              action.currentUser,
              action.systemInfo
            )
        ),
        catchError(error =>
          of(
            new UpdateVisualizationObjectAction(action.visualization.id, {
              progress: {
                statusCode: error.status,
                statusText: 'Error',
                percent: 100,
                message: error.message
              }
            })
          )
        )
      )
    )
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

          if (favoriteDetails) {
            const favoritePromise =
              visualizationObject.isNew || favoriteDetails.hasDifferentType
                ? this.favoriteService.create(
                    favoriteDetails.url,
                    favoriteDetails.favorite
                  )
                : this.favoriteService.update(
                    favoriteDetails.url,
                    favoriteDetails.favorite
                  );

            favoritePromise.subscribe(favoriteResult => {
              // Save favorite as dashboard item

              this.store.dispatch(
                new SaveVisualizationFavoriteSuccessAction(
                  action.dashboardId,
                  action.id,
                  favoriteDetails.favoriteType,
                  favoriteResult,
                  visualizationObject.isNew ? 'ADD' : 'UPDATE'
                )
              );

              // Update visualization object with new favorite
              this.store.dispatch(
                new UpdateVisualizationObjectAction(action.id, {
                  isNew: false
                })
              );

              // Update visualization layers in the store
              _.each(visualizationLayers, visualizationLayer => {
                this.store.dispatch(
                  new UpdateVisualizationLayerAction(
                    visualizationLayer.id,
                    visualizationLayer
                  )
                );
              });
            });
          }
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

  @Effect({ dispatch: false })
  removeVisualizationFavorite$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.RemoveVisualizationFavorite),
    tap((action: RemoveVisualizationFavoriteAction) => {
      this.favoriteService
        .delete(action.favoriteId, action.favoriteType)
        .subscribe();
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<VisualizationState>,
    private favoriteService: FavoriteService,
    private systemInfoService: SystemInfoService,
    private httpClient: NgxDhis2HttpClientService
  ) {}
}
