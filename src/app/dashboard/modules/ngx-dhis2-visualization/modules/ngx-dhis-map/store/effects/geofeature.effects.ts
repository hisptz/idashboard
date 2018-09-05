import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  GeofeatureActionTypes,
  LoadGeofeaturesAction,
  LoadGeofeaturesSuccessAction,
  LoadGeofeaturesFailAction
} from '../actions/geofeature.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { GeofeatureService } from '../services/geofeature.service';
@Injectable()
export class GeofeatureEffects {
  @Effect()
  loadGeofeatures$: Observable<Action> = this.actions$.pipe(
    ofType(GeofeatureActionTypes.LoadGeofeatures),
    mergeMap((action: LoadGeofeaturesAction) => {
      const { payload } = action;
      const geofeatureObservables = payload.map(({ ouDimension }) =>
        this.geofeatureService.getGeofeature(ouDimension.items.map(({ id }) => id).join(';'))
      );
      return forkJoin(geofeatureObservables).pipe(
        map(geofeaturesArr => payload.map((layer, index) => ({ id: layer.id, geofeatures: geofeaturesArr[index] })))
      );
    }),
    map(layerPayload => new LoadGeofeaturesSuccessAction(layerPayload)),
    catchError(error => of(new LoadGeofeaturesFailAction(error)))
  );

  constructor(private actions$: Actions, private geofeatureService: GeofeatureService) {}
}
