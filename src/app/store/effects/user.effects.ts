import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService, User } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/internal/operators';

import {
  addCurrentUser,
  addSystemInfo,
  loadCurrentUser,
  loadCurrentUserFail
} from '../actions';

@Injectable()
export class UserEffects {
  systemInfoLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSystemInfo),
      map(({ systemInfo }) => loadCurrentUser({ systemInfo }))
    )
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(({ systemInfo }) =>
        this.httpClient.me().pipe(
          map((currentUser: User) =>
            addCurrentUser({ currentUser, systemInfo })
          ),
          catchError((error: any) => of(loadCurrentUserFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService
  ) {}
}
