import { Component, OnInit } from '@angular/core';
import {PortalConfigurationState, StatsSummaryState} from '../../store/portal/portal.state';
import {Observable} from 'rxjs/index';
import {getPortalConfiguration, getStatsSummary} from '../../store/portal/portal.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {ActivatedRoute, Params} from '@angular/router';
import * as statsSummary from '../../store/portal/portal.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  portalConfiguration$: Observable<PortalConfigurationState>;
  portalConfigurations: any;
  theSetPage: string;
  portalPages: any;
  portalThemes: any;
  allNews: any;
  statsSummary$: Observable<StatsSummaryState>;
  statsSummaryGroups: Array<any>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    store.dispatch(new statsSummary.LoadStatsSummaryAction());
    this.statsSummary$ = store.select(getStatsSummary);
    this.portalConfiguration$ = store.select(getPortalConfiguration);
  }

  ngOnInit() {
    if (this.portalConfiguration$) {
      this.route.params.forEach((params: Params) => {
        this.theSetPage = params['id'];
        this.portalConfiguration$.subscribe((portalConfigurations) => {
          if (portalConfigurations) {
            this.portalConfigurations = portalConfigurations;
            this.portalPages = portalConfigurations['pages'];
            console.log('portal configuration', portalConfigurations.pages);
          }
        });
      });
    }
    if (this.statsSummary$) {
      this.statsSummary$.subscribe((statisticsSummary) => {
        if (statisticsSummary) {
          console.log(statisticsSummary);
          this.statsSummaryGroups = statisticsSummary.statsSummaryGroups;
          this.portalThemes = statisticsSummary['themes'];
          this.allNews = statisticsSummary['news'];
        }
      });
    }
  }

}
