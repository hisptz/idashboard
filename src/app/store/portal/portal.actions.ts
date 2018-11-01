import {Action} from '@ngrx/store';
import {PortalConfigurationState, StatsSummaryState} from './portal.state';


export enum PortalActions {
  LOAD_PORTAL_CONFIGURATION = '[ Portal configurations ] Load portal configuration',
  LOAD_PORTAL_CONFIGURATION_SUCCESS = '[ Portal configurations ] Load Portal configurations success',
  LOAD_PORTAL_CONFIGURATION_FAIL = '[ Portal configurations ] Load Portal configurations fail',
  LOAD_STATS_SUMMARY = '[Stats summary] Load stats summary',
  LOAD_STATS_SUMMARY_SUCCESS = '[Stats summary] Load stats summary success',
  LOAD_STATS_SUMMARY_FAIL = '[Stats summary] Load stats summary fail'
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



export class LoadStatsSummaryAction implements Action {
  readonly type = PortalActions.LOAD_STATS_SUMMARY;
}

export class LoadStatsSummarySuccessAction implements Action {
  readonly type = PortalActions.LOAD_STATS_SUMMARY_SUCCESS;

  constructor(public payload: StatsSummaryState) {
  }
}

export class LoadStatsSummaryFailAction implements Action {
  readonly type = PortalActions.LOAD_STATS_SUMMARY_FAIL;

  constructor(public payload: any) {}
}

export type PortalConfigurationAction =  LoadPortalConfigurationAction
  | LoadPortalConfigurationSuccessAction
  | LoadPortalConfigurationFailAction
  | LoadStatsSummaryAction
  | LoadStatsSummarySuccessAction
  | LoadStatsSummaryFailAction;
