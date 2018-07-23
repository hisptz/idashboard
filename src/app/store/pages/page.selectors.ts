import {createSelector} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {PageState} from './page.state';

const page = (state: AppState) => state.page;
console.log(page);
export const getPage = createSelector(page, (pageObject: PageState) => pageObject);
