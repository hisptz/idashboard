import { Component, OnInit, Input } from '@angular/core';
import { DashboardItem } from '../../models/dashboard-item.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { initializeDashboardItem } from '../../store/actions/dashboard-item.actions';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
  @Input()
  dashboardItem: DashboardItem;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    if (this.dashboardItem) {
      this.store.dispatch(
        initializeDashboardItem({ dashboardItem: this.dashboardItem })
      );
    }
  }
}
