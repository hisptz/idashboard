import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CurrentUserState} from '../../../../../store/current-user/current-user.state';
import {getCurrentUser} from '../../../../../store/current-user/current-user.selectors';
import {Router} from '@angular/router';
import {interval} from 'rxjs/internal/observable/interval';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../store/app.reducers';
import {GroupedSlidersState, StatsSummaryState} from '../../../../../store/portal/portal.state';
import {getGroupedSlidersInfo, getStatsSummary} from '../../../../../store/portal/portal.selectors';
import * as portalActions from '../../../../../store/portal/portal.actions';

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
  groupedSliderInfo$: Observable<GroupedSlidersState>;
  groupedSliderInfo: any;
  scrollingInfo: any;
  visualizationObjects$: any;
  currentUser$: Observable<CurrentUserState>;
  statsSummary$: Observable<StatsSummaryState>;
  constructor(private router: Router,
              private store: Store<AppState>) {
    store.dispatch(new portalActions.LoadGroupedSliderDataAction());
    this.activeSlider = 0;
    this.activeSliderGroup = 'rch0';
    this.isSliderStopped = false;
    this.currentUser$ = store.select(getCurrentUser);
    this.statsSummary$ = store.select(getStatsSummary);
    this.groupedSliderInfo$ = store.select(getGroupedSlidersInfo);
  }

  ngOnInit() {
    if (this.groupedSliderInfo$) {
      this.groupedSliderInfo$.subscribe((groupedSliderInfo) => {
        if (groupedSliderInfo) {
          this.groupedSliderInfo = groupedSliderInfo.data;
          this.scrollingInfo = groupedSliderInfo.data['scrollingInfo'];
          console.log(groupedSliderInfo.data);
        }
      });
    }
    if (this.statsSummary$) {
      this.statsSummary$.subscribe((statisticsSummary) => {
        if (statisticsSummary) {
          this.visualizationObjects$ = statisticsSummary['visualization'];
        }
      });
    }
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
      const intervalTime = interval(10000);

      console.log('sliderStopped', sliderStopped);
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
      for (let count = 0; count <= 6 ; count++) {
        document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
        document.getElementById(buttons[count].id).style.color = '#222';
      }
      this.activeSliderGroup = activeSliderGroup;
      document.getElementById(activeSliderGroup).style.backgroundColor = '#2A8FD1';
      document.getElementById(activeSliderGroup).style.color = '#FFF';
    }
  }
}
