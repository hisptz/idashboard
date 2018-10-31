import {Action} from '@ngrx/store';
import {PortalConfigurationState} from './portal.state';


export enum PortalActions {
  LOAD_PORTAL_CONFIGURATION = '[ Portal configurations ] Load portal configuration',
  LOAD_PORTAL_CONFIGURATION_SUCCESS = '[ Portal configurations ] Load Portal configurations success',
  LOAD_PORTAL_CONFIGURATION_FAIL = '[ Portal configurations ] Load Portal configurations fail',
}

export class LoadPortalConfigurationAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_CONFIGURATION;
}

export class LoadPortalConfigurationSuccessAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_CONFIGURATION_SUCCESS;

  constructor(public payload: PortalConfigurationState) {
  }
}

export class LoadPortalConfigurationFailAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_CONFIGURATION_FAIL;

  constructor(public payload: any) {}
}

export type PortalConfigurationAction =  LoadPortalConfigurationAction
  | LoadPortalConfigurationSuccessAction
  | LoadPortalConfigurationFailAction;
