import {PortalConfigurationAction, PortalActions} from './portal.actions';
import {DownloadsState, PortalConfigurationState, StatsSummaryState, FAQState, ExternalSourcesState, DataState} from './portal.state';

export function portalReducer(state: PortalConfigurationState = null, action: PortalConfigurationAction) {
  switch (action.type) {
    case PortalActions.LOAD_PORTAL_CONFIGURATION_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export function statsSummaryReducer(state: StatsSummaryState = null, action: PortalConfigurationAction) {
  switch (action.type) {
    case PortalActions.LOAD_STATS_SUMMARY_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export function downloadsReducer(state: DownloadsState = null, action: PortalConfigurationAction) {
  switch (action.type) {
    case PortalActions.LOAD_DOWNLOADS_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

// START: FAQ REDUCER

export function faqReducer(state: FAQState = null, action: PortalConfigurationAction): FAQState {
  switch (action.type) {
    case PortalActions.LOAD_FAQ_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

// END: FAQ REDUCER


export function loadDataFromExternalSourcesReducer(state: ExternalSourcesState = null, action: PortalConfigurationAction) {
  switch (action.type) {
    case PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE_SUCCESS:
      return {...action.payload};
    case PortalActions.LOAD_DATA_FROM_EXTERNAL_SOURCE: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}

export function loadAnalyticsData(state: DataState = null, action: PortalConfigurationAction) {
  switch (action.type) {
    case PortalActions.LOAD_DATA_SUCCESS: {
      // const newObj = {};
      // newObj[action.payload.rows[0][0]] = action.payload;
      // return {
      //   ...state,
      //   ...newObj
      // };
      return {...action.payload};
    }
    case PortalActions.LOAD_DATA: {
      return {
        ...state
      };
    }
  }
}
