import { Action } from "@ngrx/store";
import {
  DownloadsState,
  PortalConfigurationState,
  StatsSummaryState,
  FAQState,
  FeedBacksState,
  PortalViewsState
} from "./portal.state";

export enum PortalActions {
  LOAD_PORTAL_CONFIGURATION = "[ Portal configurations ] Load portal configuration",
  LOAD_PORTAL_CONFIGURATION_SUCCESS = "[ Portal configurations ] Load Portal configurations success",
  LOAD_PORTAL_CONFIGURATION_FAIL = "[ Portal configurations ] Load Portal configurations fail",
  LOAD_STATS_SUMMARY = "[Stats summary] Load stats summary",
  LOAD_STATS_SUMMARY_SUCCESS = "[Stats summary] Load stats summary success",
  LOAD_STATS_SUMMARY_FAIL = "[Stats summary] Load stats summary fail",
  LOAD_DOWNLOADS = "[Downloads] Load downloads",
  LOAD_DOWNLOADS_SUCCESS = "[Downloads] Load downloads success",
  LOAD_DOWNLOADS_FAIL = "[Downloads] Load downloads fail",
  LOAD_DATA_FROM_EXTERNAL_SOURCE = "[Data from external source] Load Data from external source",
  LOAD_DATA_FROM_EXTERNAL_SOURCE_SUCCESS = "[Data from external source] Load Data from external source success",
  LOAD_DATA_FROM_EXTERNAL_SOURCE_FAIL = "[Data from external source]Load Data from external source fail",
  LOAD_FAQ = "[FAQ] Load downloads",
  LOAD_FAQ_SUCCESS = "[FAQ] Load downloads success",
  LOAD_FAQ_FAIL = "[FAQ] Load downloads fail",
  LOAD_DATA = "[Data] load data",
  LOAD_DATA_SUCCESS = "[Data] load data success",
  LOAD_DATA_FAIL = "[Data] load data fail",
  LOAD_GROUPED_SLIDER_DATA = "[Grouped slider] Load data",
  LOAD_GROUPED_SLIDER_DATA_SUCCESS = "[Grouped slider] Load data success",
  LOAD_GROUPED_SLIDER_DATA_FAIL = "[Grouped data Load data fail",
  LOAD_FEEDBACKS = "[Feedbacks] Load feedbacks",
  LOAD_FEEDBACKS_SUCCESS = "[Feedbacks] Load feedbacks success",
  LOAD_FEEDBACKS_FAIL = "[Feedbacks] Load feedbacks fail",
  LOAD_PORTAL_VIEWS = "[Portal views] Load portal views",
  LOAD_PORTAL_VIEWS_SUCCESS = "[Portal views] Load portal views success",
  LOAD_PORTAL_VIEWS_FAIL = "[Portal views] Load portal views fail"
}

export class LoadPortalConfigurationAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_CONFIGURATION;
}

export class LoadPortalConfigurationSuccessAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_CONFIGURATION_SUCCESS;

  constructor(public payload: PortalConfigurationState) {}
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

  constructor(public payload: StatsSummaryState) {}
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

export class LoadExtractedDataFromExternalSourcesAction implements Action {
  readonly type = PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE;
  constructor(public payload: any) {}
}

export class LoadExtractedDataFromExternalSourcesSuccessAction
  implements Action {
  readonly type = PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadExtractedDataFromExternalSourcesFailAction implements Action {
  readonly type = PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE_FAIL;
  constructor(public payload: any) {}
}

// Load data
export class LoadDataAction implements Action {
  readonly type = PortalActions.LOAD_DATA;
  constructor(public payload: any) {}
}

export class LoadDataSuccessAction implements Action {
  readonly type = PortalActions.LOAD_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadDataFailAction implements Action {
  readonly type = PortalActions.LOAD_DATA_FAIL;
  constructor(public payload: any) {}
}

// Load grouped slider data
export class LoadGroupedSliderDataAction implements Action {
  readonly type = PortalActions.LOAD_GROUPED_SLIDER_DATA;
}

export class LoadGroupedSliderDataSuccessAction implements Action {
  readonly type = PortalActions.LOAD_GROUPED_SLIDER_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadGroupedSliderDataFailAction implements Action {
  readonly type = PortalActions.LOAD_GROUPED_SLIDER_DATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadFeedbacksAction implements Action {
  readonly type = PortalActions.LOAD_FEEDBACKS;
}

export class LoadFeedbacksSuccessAction implements Action {
  readonly type = PortalActions.LOAD_FEEDBACKS_SUCCESS;

  constructor(public payload: FeedBacksState) {}
}

export class LoadFeedbacksFailAction implements Action {
  readonly type = PortalActions.LOAD_FEEDBACKS_FAIL;

  constructor(public payload: any) {}
}

export class LoadPortalViewsAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_VIEWS;
}

export class LoadPortalViewsSuccessAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_VIEWS_SUCCESS;

  constructor(public payload: PortalViewsState) {}
}

export class LoadPortalViewsFailAction implements Action {
  readonly type = PortalActions.LOAD_PORTAL_VIEWS_FAIL;

  constructor(public payload: any) {}
}

export type PortalConfigurationAction =
  | LoadPortalConfigurationAction
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
  | LoadFAQFailAction
  | LoadExtractedDataFromExternalSourcesAction
  | LoadExtractedDataFromExternalSourcesSuccessAction
  | LoadExtractedDataFromExternalSourcesFailAction
  | LoadDataAction
  | LoadDataSuccessAction
  | LoadDataFailAction
  | LoadGroupedSliderDataAction
  | LoadGroupedSliderDataSuccessAction
  | LoadGroupedSliderDataFailAction
  | LoadFeedbacksAction
  | LoadFeedbacksSuccessAction
  | LoadFeedbacksFailAction
  | LoadPortalViewsAction
  | LoadPortalViewsSuccessAction
  | LoadPortalViewsFailAction;
