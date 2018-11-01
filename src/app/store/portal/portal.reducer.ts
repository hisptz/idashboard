import {PortalConfigurationAction, PortalActions} from './portal.actions';
import {DownloadsState, PortalConfigurationState, StatsSummaryState} from './portal.state';

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
