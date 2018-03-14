import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {VisualizationObjectService} from '../../dashboard/providers/visualization-object.service';
import * as fromAction from '../actions';
import {ApplicationState} from '../application-state';
import {Visualization} from '../../dashboard/model/visualization';
import 'rxjs/add/operator/take';
@Injectable()
export class VisualizationObjectEffect {
  constructor(
    private actions$: Actions,
    private store: Store<ApplicationState>,
    private visualizationObjectService: VisualizationObjectService,
  ) {}

  @Effect({dispatch: false}) loadedVisualizationObject$: Observable<Action> = this.actions$
    .ofType(fromAction.INITIAL_VISUALIZATION_OBJECTS_LOADED_ACTION)
    .withLatestFrom(this.store)
    .switchMap(([action, store]: [any, ApplicationState]) => {
      action.payload.forEach((visualizationObject: Visualization) => {
        const visualizationDetails: any = {...visualizationObject.details};

        if (visualizationDetails && visualizationDetails.favorite && visualizationDetails.favorite.id) {
          this.store.dispatch(new fromAction.LoadFavoriteAction({
            apiRootUrl: store.uiState.systemInfo.rootUrl + '/api/',
            visualizationObject: visualizationObject
          }))
        }
      });
      return Observable.of(null)
    });

  @Effect() visualizationWithMapSettings$ = this.actions$
    .ofType(fromAction.UPDATE_VISUALIZATION_WITH_MAP_SETTINGS)
    .withLatestFrom(this.store)
    .flatMap(([action, store]: [any, ApplicationState]) => this.visualizationObjectService.updateVisualizationWithMapSettings(
      store.uiState.systemInfo.apiRootUrl,
      action.payload
    )).map((visualization: Visualization) => new fromAction.SaveVisualization(visualization));

}
