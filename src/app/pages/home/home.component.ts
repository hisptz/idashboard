import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Observable } from 'rxjs';
import {
  getAllDashboardCount, getDashboardLoaded,
  getDashboardLoading
} from '../../store/dashboard/dashboard.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  welcomingMessage: {title: string, description: string};
  welcomingMessageObject: {[id: number]: {title: string, description: string}};

  dashboardsLoading$: Observable<boolean>;
  dashboardsLoaded$: Observable<boolean>;
  dashboardsCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.dashboardsLoading$ = store.select(getDashboardLoading);
    this.dashboardsLoaded$ = store.select(getDashboardLoaded);
    this.dashboardsCount$ = store.select(getAllDashboardCount);
    this.welcomingMessageObject = {
      0: {
        title: 'Intuitive design patterns',
        description: 'Enjoy simple, elegant and improved look and feel'
      },
      1: {
        title: 'Impressive data visualizations',
        description: 'Interactively visualize you data in charts, table and maps'
      },
      2: {
        title: 'Impressive data dictionary',
        description: 'Do not just look on your data, know more about your data'
      }
    };

    this.welcomingMessage = this.welcomingMessageObject[this.getRandomInt(0, 2)];
  }


  ngOnInit() {
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

}
