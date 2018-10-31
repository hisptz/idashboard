import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as portalActions from '../portal/portal.actions';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {PortalConfigurationState} from './portal.state';

@Injectable()
export class PortalEffects {

  @Effect()
  loadPortalConfiguration$ = this.actions$
    .ofType<portalActions.LoadPortalConfigurationAction>(portalActions.PortalActions.LOAD_PORTAL_CONFIGURATION)
    .pipe(
      switchMap(() => this._loadPortalConfigurations().pipe(
        map((portalConfigurationObj: PortalConfigurationState) =>
          new portalActions.LoadPortalConfigurationSuccessAction(portalConfigurationObj)),
        catchError((error) => of(new portalActions.LoadPortalConfigurationFailAction(error)))
      ))
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _loadPortalConfigurations(): Observable<any> {
    console.log('executed portal')
    return this.httpClient.get(`dataStore/observatory/portalConfigurations.json`);
  }
}
