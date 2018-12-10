import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CurrentUserState} from '../../../../../store/current-user/current-user.state';
import {getCurrentUser} from '../../../../../store/current-user/current-user.selectors';
import {Router} from '@angular/router';
import {interval} from 'rxjs/internal/observable/interval';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../store/app.reducers';
import {
  GroupedSlidersState,
  PortalConfigurationState,
  StatsSummaryState
} from '../../../../../store/portal/portal.state';
import {
  getAnalyticsData,
  getGroupedSlidersInfo,
  getPortalConfiguration,
  getStatsSummary
} from '../../../../../store/portal/portal.selectors';
import * as portalActions from '../../../../../store/portal/portal.actions';
import {getDashboardGroupedVisualizationObjects} from '../../../../../store/visualization/visualization.selectors';

@Component({
  selector: 'app-grouped-slider-full-screen',
  templateUrl: './grouped-slider-full-screen.component.html',
  styleUrls: ['./grouped-slider-full-screen.component.css']
})
export class GroupedSliderFullScreenComponent implements OnInit {

  headersOfSliders: Array<any>;
  activeSlider: number;
  isSliderStopped: boolean;
  activeSliderGroup: string;
  dashboardsGroups: any;
  groupedSliderInfo$: Observable<GroupedSlidersState>;
  groupedSliderInfo: any;
  scrollingInfo: any;
  visualizationObjects$: any;
  currentUser$: Observable<CurrentUserState>;
  statsSummary$: Observable<StatsSummaryState>;
  headerInfo: any[];
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
    // this.analyticsData$ = store.select(getAnalyticsData);
    store.select(getPortalConfiguration).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.headerInfo = response.header;
      }

    }, (error) => {
    });

  }

  ngOnInit() {
    this.fullScreen();
    if (this.groupedSliderInfo$) {
      this.groupedSliderInfo$.subscribe((groupedSliderInfo) => {
        if (groupedSliderInfo) {
          this.groupedSliderInfo = groupedSliderInfo.data;
          this.scrollingInfo = groupedSliderInfo.data['scrollingInfo'];
          this.dashboardsGroups =  groupedSliderInfo.data['dashboards'];
        }
      });
    }

    this.sliderTiming(this.isSliderStopped, this.activeSliderGroup);

    this.sliderTiming(this.isSliderStopped, this.activeSliderGroup);
  }

  stopSlider(id) {
    this.isSliderStopped = true;
    this.activeSliderGroup = id;
    this.activeSlider = -1
    this.sliderTiming(true, this.activeSliderGroup);
  }

  sliderTiming(sliderStopped, activeSliderGroup) {
    if (!sliderStopped && activeSliderGroup === 'rch0') {
      const intervalTime = interval(15000);
      intervalTime.subscribe((countTime) => {
        // console.log(countTime);
        if (this.activeSlider <= 6 && this.activeSlider >= 0) {
          if (this.headersOfSliders[this.activeSlider].counter === this.activeSlider) {
            const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
            for (let count = 0; count <= 6; count++) {
              document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
              document.getElementById(buttons[count].id).style.color = '#222';
            }
            this.activeSliderGroup = this.headersOfSliders[this.activeSlider].id + this.headersOfSliders[this.activeSlider].counter;
            document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.backgroundColor = '#2A8FD1';
            document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.color = '#FFF';
          }
          this.activeSlider++;
        } else if (this.activeSlider > 6) {
          this.activeSlider = 0;
        }
      });
    } else {
      const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
      for (let count = 0; count <= 6; count++) {
        document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
        document.getElementById(buttons[count].id).style.color = '#222';
      }
      this.activeSliderGroup = activeSliderGroup;
      document.getElementById(activeSliderGroup).style.backgroundColor = '#2A8FD1';
      document.getElementById(activeSliderGroup).style.color = '#FFF';
    }
  }


  fullScreen() {
    const elem = document.documentElement;
    const methodToBeInvoked = elem.requestFullscreen ||
      elem.webkitRequestFullScreen || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
  }
}
