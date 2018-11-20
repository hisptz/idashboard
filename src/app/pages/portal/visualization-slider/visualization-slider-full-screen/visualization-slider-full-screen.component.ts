import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {CurrentUserState} from '../../../../store/current-user/current-user.state';
import {getCurrentUser} from '../../../../store/current-user/current-user.selectors';
import {getStatsSummary} from '../../../../store/portal/portal.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import {StatsSummaryState} from '../../../../store/portal/portal.state';
import {Params} from '@angular/router';
import * as portalActions from '../../../../store/portal/portal.actions';

@Component({
  selector: 'app-visualization-slider-full-screen',
  templateUrl: './visualization-slider-full-screen.component.html',
  styleUrls: ['./visualization-slider-full-screen.component.css']
})
export class VisualizationSliderFullScreenComponent implements OnInit {

  visualizationObjects$: Observable<any>;
  currentUser$: Observable<CurrentUserState>;
  statsSummary$: Observable<StatsSummaryState>;
  visualizationObjects1: Array<any>;
  visualizationObjects2: Array<any>;
  dashboardAccess: {
    delete: true
    externalize: true
    manage: true
    read: true
    update: true
    write: true
  };
  constructor(private store: Store<AppState>) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    this.currentUser$ = store.select(getCurrentUser);
    this.statsSummary$ = store.select(getStatsSummary);
  }

  ngOnInit() {
    if (this.statsSummary$) {
      this.statsSummary$.subscribe((statisticsSummary) => {
        if (statisticsSummary) {
          this.visualizationObjects$ = statisticsSummary['visualization'];
          if (this.visualizationObjects$) {
            this.visualizationObjects1.push(this.visualizationObjects$[0]);
            this.visualizationObjects2.push(this.visualizationObjects$[1]);
          }
        }
      });
    }
  }

}
