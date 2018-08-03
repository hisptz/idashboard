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
import {TimerObservable} from 'rxjs-compat/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';

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

  timeOut: boolean;
  activeTime = 0;
  timerStatus: boolean;
  private subscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
    this.dashboardsLoading$ = store.select(getDashboardLoading);
    this.dashboardsLoaded$ = store.select(getDashboardLoaded);
    this.dashboardsCount$ = store.select(getAllDashboardCount);
    this.dashboardsCreating$ = store.select(getDashboardCreateStatus);
    this.welcomingMessageObject = {
      0: {
        title: 'Welcome to Tanzania Health Observatory',
        description: 'Enjoy simple, elegant and improved look and feel'
      }
    };

    this.welcomingMessage = this.welcomingMessageObject[this.getRandomInt(0, 0)];
    this.welcomingDescription = WELCOMING_DESCRIPTION;
    this.welcomingTitle = WELCOMING_TITLE;
    this.timeOut = false;
    this.timerStatus = true;
  }


  ngOnInit() {
    this.route.params.forEach((params: Params) => {});
    const timer = TimerObservable.create(2000, 2000);
    this.subscription = timer.subscribe(t => {
      this.activeTime = t;
      const elem = document.getElementById('progress-bar');
      elem.style.width = (this.activeTime * 20) + '%';
      if (this.activeTime > 5) {
        this.timeOut = true;
        this.router.navigate(['/page/home' ]);
        this.activeTime = 0;
      }
    });
  }

  stopTimer (time) {
    this.activeTime = time;
    this.timerStatus = false;
    this.subscription.unsubscribe();
  }

  startTimer(time) {
    this.timerStatus = true;
    const timer = TimerObservable.create(2000, 2000);
    this.subscription = timer.subscribe(t  => {
      this.activeTime = t + time + 1;
      const elem = document.getElementById('progress-bar');
      elem.style.width = (this.activeTime * 20) + '%';
      if (this.activeTime > 5) {
        this.timeOut = true;
        this.router.navigate(['/page/home' ]);
        this.activeTime = 0;
      }
    });
  }
  OnDestroy() {
  }

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
