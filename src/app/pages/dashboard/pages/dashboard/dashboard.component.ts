import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { loadDashboardPreferences } from '../../store/actions/dashboard-preferences.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  preferences = {
    menuAlignment: 'left',
    menuType: 'default'
  };
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(loadDashboardPreferences());
  }
}
