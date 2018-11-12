import {Action} from '@ngrx/store';
import {DownloadsState, PortalConfigurationState, StatsSummaryState, FAQState} from './portal.state';


export enum PortalActions {
  LOAD_PORTAL_CONFIGURATION = '[ Portal configurations ] Load portal configuration',
  LOAD_PORTAL_CONFIGURATION_SUCCESS = '[ Portal configurations ] Load Portal configurations success',
  LOAD_PORTAL_CONFIGURATION_FAIL = '[ Portal configurations ] Load Portal configurations fail',
  LOAD_STATS_SUMMARY = '[Stats summary] Load stats summary',
  LOAD_STATS_SUMMARY_SUCCESS = '[Stats summary] Load stats summary success',
  LOAD_STATS_SUMMARY_FAIL = '[Stats summary] Load stats summary fail',
  LOAD_DOWNLOADS = '[Downloads] Load downloads',
  LOAD_DOWNLOADS_SUCCESS = '[Downloads] Load downloads success',
  LOAD_DOWNLOADS_FAIL = '[Downloads] Load downloads fail',
  LOAD_FAQ = '[FAQ] Load downloads',
  LOAD_FAQ_SUCCESS = '[FAQ] Load downloads success',
  LOAD_FAQ_FAIL = '[FAQ] Load downloads fail'
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

export class LoadDownloadsAction implements Action {
  readonly type = PortalActions.LOAD_DOWNLOADS;
}

export class LoadDownloadsSuccessAction implements Action {
  readonly type = PortalActions.LOAD_DOWNLOADS_SUCCESS;

  constructor(public payload: DownloadsState) {}
}

export class LoadDownloadsFailAction implements Action {
  readonly type = PortalActions.LOAD_DOWNLOADS_FAIL;

  constructor(public payload: any) {}
}

// START: FAQ ACTION CLASSES
export class LoadFAQAction implements Action {
  readonly type = PortalActions.LOAD_FAQ;
}

export class LoadFAQSuccessAction implements Action {
  readonly type = PortalActions.LOAD_FAQ_SUCCESS;

  constructor(public payload: FAQState) {}
}

export class LoadFAQFailAction implements Action {
  readonly type = PortalActions.LOAD_FAQ_FAIL;

  constructor(public payload: any) {}
}

// ENDS: FAQ ACTION CLASSES


export type PortalConfigurationAction =  LoadPortalConfigurationAction
  | LoadPortalConfigurationSuccessAction
  | LoadPortalConfigurationFailAction
  | LoadStatsSummaryAction
  | LoadStatsSummarySuccessAction
  | LoadStatsSummaryFailAction
  | LoadDownloadsAction
  | LoadDownloadsSuccessAction
  | LoadDownloadsFailAction
  | LoadFAQAction
  | LoadFAQSuccessAction
  | LoadFAQFailAction;
