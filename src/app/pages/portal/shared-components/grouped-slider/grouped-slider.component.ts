import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/internal/observable/interval';
import {AppState} from '../../../../store/app.reducers';
import {Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../../../store/current-user/current-user.selectors';
import {CurrentUserState} from '../../../../store/current-user/current-user.state';
import {getAnalyticsData, getGroupedSlidersInfo, getStatsSummary} from '../../../../store/portal/portal.selectors';
import * as portalActions from '../../../../store/portal/portal.actions';
import {DataState, GroupedSlidersState, StatsSummaryState} from '../../../../store/portal/portal.state';
import { visualizationStructure} from '../../models/visualization-structure';
import {getDashboardGroupedVisualizationObjects} from '../../../../store/visualization/visualization.selectors';

@Component({
  selector: 'app-grouped-slider',
  templateUrl: './grouped-slider.component.html',
  styleUrls: ['./grouped-slider.component.css']
})
export class GroupedSliderComponent implements OnInit {

  headersOfSliders: Array<any>;
  activeSlider: number;
  isSliderStopped: boolean;
  activeSliderGroup: string;
  activeData: any;
  groupedSliderInfo$: Observable<GroupedSlidersState>;
  analyticsData$: Observable<DataState>;
  dashboardsGroups: any;
  groupedSliderInfo: any;
  scrollingInfo: any;
  visualizationObjects$: any;
  currentUser$: Observable<CurrentUserState>;
  statsSummary$: Observable<StatsSummaryState>;

  groupedDashboards$: Observable<any>;
  constructor(private router: Router,
              private store: Store<AppState>) {
    store.dispatch(new portalActions.LoadGroupedSliderDataAction());
    store.dispatch(new portalActions.LoadDataAction('dataStore/observatory/groupedSliderInfoDimensions'));
    this.groupedDashboards$ = this.store.select(getDashboardGroupedVisualizationObjects);
    this.activeSlider = 0;
    this.activeSliderGroup = 'rch0';
    this.isSliderStopped = false;
    this.currentUser$ = store.select(getCurrentUser);
    this.statsSummary$ = store.select(getStatsSummary);
    this.groupedSliderInfo$ = store.select(getGroupedSlidersInfo);
    this.analyticsData$ = store.select(getAnalyticsData);
  }

  ngOnInit() {
    this.headersOfSliders = [
      {
        'id': 'rch',
        'counter': 0,
        'name': 'RCH'
      },
      {
        'id': 'hiv_aids',
        'counter': 1,
        'name': 'HIV and AIDS'
      },
      {
        'id': 'malaria',
        'counter': 2,
        'name': 'Malaria'
      },
      {
        'id': 'tb_leprosy',
        'counter': 3,
        'name': 'TB & LEPROSY'
      },
      {
        'id': 'tracer',
        'counter': 4,
        'name': 'TRACER DRUGS'
      },
      {
        'id': 'ntd_ncd',
        'counter': 5,
        'name': 'NTD and NCD'
      },
      {
        'id': 'ivd',
        'counter': 6,
        'name': 'IVD'
      }
    ];
    if (this.groupedSliderInfo$) {
      this.groupedSliderInfo$.subscribe((groupedSliderInfo) => {
        if (groupedSliderInfo) {
          this.groupedSliderInfo = groupedSliderInfo.data;
          this.scrollingInfo = groupedSliderInfo.data['scrollingInfo'];
          this.dashboardsGroups = groupedSliderInfo.data['dashboards'];
        }
      });
    }

    this.sliderTiming(this.isSliderStopped, this.activeSliderGroup);
  }

  stopSlider(id, groupedSliderInfo) {
    console.log('visualizationObject', JSON.stringify(groupedSliderInfo));
    this.isSliderStopped = true;
    this.activeSliderGroup = id;
    this.activeSlider = -1;
    this.activeData = groupedSliderInfo;
    this.sliderTiming(true, this.activeSliderGroup);
  }

  sliderTiming(sliderStopped, activeSliderGroup) {
    if (!sliderStopped && activeSliderGroup === 'rch0') {
      const intervalTime = interval(15000);
      intervalTime.subscribe((countTime) => {
        // console.log(countTime);
        if (this.activeSlider <= 6 && this.activeSlider >= 0) {
          if (this.headersOfSliders[this.activeSlider].counter === this.activeSlider) {
            try {
              const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
              for (let count = 0; count <= 6; count++) {
                document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
                document.getElementById(buttons[count].id).style.color = '#222';
              }
              this.activeSliderGroup = this.headersOfSliders[this.activeSlider].id + this.headersOfSliders[this.activeSlider].counter;
              document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.backgroundColor = '#2A8FD1';
              document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.color = '#FFF';
            } catch (e) {
              console.log(e);
            }
          }
          this.activeSlider++;
        } else if (this.activeSlider > 6) {
          this.activeSlider = 0;
        }
      });
    } else {
      try {
        const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
        for (let count = 0; count <= 6 ; count++) {
          document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
          document.getElementById(buttons[count].id).style.color = '#222';
        }
        this.activeSliderGroup = activeSliderGroup;
        document.getElementById(activeSliderGroup).style.backgroundColor = '#2A8FD1';
        document.getElementById(activeSliderGroup).style.color = '#FFF';
      } catch (e) {
        console.log(e);
      }
    }
  }
}
