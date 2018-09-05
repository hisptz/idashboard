import { Action } from '@ngrx/store';
import { LayerGeofeature } from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum GeofeatureActionTypes {
  LoadGeofeatures = '[Geofeature] LoadGeofeatures',
  LoadGeofeaturesSuccess = '[Geofeature] LoadGeofeaturesSuccess',
  LoadGeofeaturesFail = '[Geofeature] LoadGeofeaturesFail'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class LoadGeofeaturesAction implements Action {
  readonly type = GeofeatureActionTypes.LoadGeofeatures;

  constructor(public payload: Array<LoadGeofeaturePayload>) {}
}

export class LoadGeofeaturesSuccessAction implements Action {
  readonly type = GeofeatureActionTypes.LoadGeofeaturesSuccess;

  constructor(public payload: Array<LayerGeofeature>) {}
}

export class LoadGeofeaturesFailAction implements Action {
  readonly type = GeofeatureActionTypes.LoadGeofeaturesFail;

  constructor(public error: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type GeofeatureActions = LoadGeofeaturesAction | LoadGeofeaturesSuccessAction | LoadGeofeaturesFailAction;

export interface LoadGeofeaturePayload {
  id: string;
  ouDimension: any;
}
