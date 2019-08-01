import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { DashboardPreferencesService } from '../../services/dashboard-preferences.service';
import {
  addDashboardPreferences,
  loadDashboardPreferences,
  loadDashboardPreferencesFail
} from '../actions/dashboard-preferences.actions';

@Injectable()
export class DashboardPreferencesEffects {
  loadDashboardPreferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDashboardPreferences),
      switchMap(() =>
        this.dashboardPreferencesService.get().pipe(
          map((dashboardPreferences: DashboardPreferences) =>
            addDashboardPreferences({
              dashboardPreferences
            })
          ),
          catchError((error: any) =>
            of(loadDashboardPreferencesFail({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardPreferencesService: DashboardPreferencesService
  ) {}
}
