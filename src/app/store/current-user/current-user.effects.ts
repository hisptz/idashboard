import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as currentUser from './current-user.actions';

import {Observable, of} from 'rxjs';
import {CurrentUserState} from './current-user.state';

import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class CurrentUserEffects {

  @Effect()
  loadCurrentUser$ = this.actions$
    .ofType<currentUser.LoadAction>(currentUser.CurrentUserActions.LOAD)
    .pipe(
      switchMap(() => this._load().pipe(
        map((currentUserObject: CurrentUserState) =>
          new currentUser.LoadSuccessAction(currentUserObject)),
        catchError((error) => of(new currentUser.LoadFailAction(error)))
      ))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _load(): Observable<any> {
    return this.httpClient.get(`me.json?fields=id,name,displayName,created,lastUpdated,email,
    dataViewOrganisationUnits[id,name,level],userCredentials[username]`);
  }
}
