import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Observable } from 'rxjs';
import {
  getAllDashboardCount, getDashboardCreateStatus, getDashboardLoaded,
  getDashboardLoading
} from '../../store/dashboard/dashboard.selectors';
import { WELCOMING_DESCRIPTION, WELCOMING_TITLE } from '../../constants/welcoming-messages.constants';
import { CreateAction } from '../../store/dashboard/dashboard.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  welcomingMessage: {title: string, description: string};
  welcomingMessageObject: {[id: number]: {title: string, description: string}};
  welcomingDescription: string;
  welcomingTitle: string;

  dashboardsLoading$: Observable<boolean>;
  dashboardsLoaded$: Observable<boolean>;
  dashboardsCount$: Observable<number>;
  dashboardsCreating$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.dashboardsLoading$ = store.select(getDashboardLoading);
    this.dashboardsLoaded$ = store.select(getDashboardLoaded);
    this.dashboardsCount$ = store.select(getAllDashboardCount);
    this.dashboardsCreating$ = store.select(getDashboardCreateStatus);
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
    this.welcomingDescription = WELCOMING_DESCRIPTION;
    this.welcomingTitle = WELCOMING_TITLE;
  }


  ngOnInit() {}

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }

  onCreateDashboard(e) {
    e.stopPropagation();
    this.store.dispatch(new CreateAction('Untitled'));
  }

}
