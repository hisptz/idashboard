import {Action} from '@ngrx/store';
import {PageState} from './page.state';


export enum PageActions {
  LOAD = '[ Page ] Load the page',
  LOAD_SUCCESS = '[ Page ] Load the page success',
  LOAD_FAIL = '[ Page ] Load the page fail'
}

export class LoadAction implements Action {
  readonly type = PageActions.LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = PageActions.LOAD_SUCCESS;

  constructor(public payload: PageState) {
  }
}

export class LoadFailAction implements Action {
  readonly type = PageActions.LOAD_FAIL;

  constructor(public payload: any) {}
}

export type PageAction =  LoadAction | LoadSuccessAction | LoadFailAction;
