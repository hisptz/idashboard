import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CurrentUserState} from '../../../../../store/current-user/current-user.state';
import {getCurrentUser} from '../../../../../store/current-user/current-user.selectors';
import {Visualization} from '../../../../../store/visualization/visualization.state';
import {Router} from '@angular/router';
import {interval} from 'rxjs/internal/observable/interval';
import {Store} from '@ngrx/store';
import * as visualizationSelectors from '../../../../../store/visualization/visualization.selectors';
import {AppState} from '../../../../../store/app.reducers';

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
  currentVisualizationObject$: Observable<Visualization>;
  currentUser$: Observable<CurrentUserState>;
  constructor(private router: Router,
              private store: Store<AppState>) {
    this.activeSlider = 0;
    this.isSliderStopped = false;
    this.currentVisualizationObject$ = this.store.select(visualizationSelectors.getCurrentVisualizationObject);
    this.currentUser$ = store.select(getCurrentUser);
  }

  ngOnInit() {
    this.headersOfSliders = [
      {
        'id': 'malaria',
        'counter': 0,
        'name': 'Malaria'
      },
      {
        'id': 'hiv_aids',
        'counter': 1,
        'name': 'HIV and AIDS'
      },
      {
        'id': 'tb_lp',
        'counter': 2,
        'name': 'TB & Leprosy'
      }
    ];

    this.sliderTiming(this.isSliderStopped, '');
  }

  stopSlider(id) {
    console.log(id);
    this.isSliderStopped = true;
    this.activeSliderGroup = id;
    this.activeSlider = -1
    this.sliderTiming(true, this.activeSliderGroup);
  }

  sliderTiming(sliderStopped, activeSliderGroup) {
    if (!sliderStopped && activeSliderGroup === '') {
      const intervalTime = interval(30000);

      console.log('sliderStopped', sliderStopped);
      intervalTime.subscribe((countTime) => {
        // console.log(countTime);
        if (this.activeSlider < 3 && this.activeSlider >= 0) {
          if (this.headersOfSliders[this.activeSlider].counter === this.activeSlider) {
            const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
            for (let count = 0; count < 3; count++) {
              document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
              document.getElementById(buttons[count].id).style.color = '#222';
            }
            this.activeSliderGroup = this.headersOfSliders[this.activeSlider].id + this.headersOfSliders[this.activeSlider].counter;
            document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.backgroundColor = '#2A8FD1';
            document.getElementById(this.headersOfSliders[this.activeSlider].id + this.activeSlider).style.color = '#FFF';
          }
          this.activeSlider++;
        } else if (this.activeSlider >= 3) {
          this.activeSlider = 0;
        }
      });
    } else {
      const buttons = document.getElementsByClassName('grouped-sliders-header-btn');
      for (let count = 0; count < 3; count++) {
        document.getElementById(buttons[count].id).style.backgroundColor = '#eee';
        document.getElementById(buttons[count].id).style.color = '#222';
      }
      this.activeSliderGroup = activeSliderGroup;
      document.getElementById(activeSliderGroup).style.backgroundColor = '#2A8FD1';
      document.getElementById(activeSliderGroup).style.color = '#FFF';
    }
  }

}
