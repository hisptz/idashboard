import {PageState} from './page.state';
import {PageAction, PageActions} from './page.actions';

export function pageReducer(state: PageState = null, action: PageAction) {
  switch (action.type) {
    case PageActions.LOAD_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}
