import {PageState, SinglePageState} from './page.state';
import {PageAction, PageActions} from './page.actions';

export function pageReducer(state: PageState = null, action: PageAction) {
  switch (action.type) {
    case PageActions.LOAD_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export function singlePageReducer(state: SinglePageState = null, action: PageAction) {
  switch (action.type) {
    case PageActions.LOAD_TOP_SCROLL_BAR_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export function singleFAQsHelpPageReducer(state: SinglePageState = null, action: PageAction) {
  switch (action.type) {
    case PageActions.LOAD_FAQS_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export function singleStatsSummaryPageReducer(state: SinglePageState = null, action: PageAction) {
  switch (action.type) {
    case PageActions.LOAD_STATS_SUMMARY_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}
