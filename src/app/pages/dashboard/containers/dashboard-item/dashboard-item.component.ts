import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { camelCase, isPlainObject } from 'lodash';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import { Visualization } from '../../modules/ngx-dhis2-visualization/models';
import { loadFavorite } from '../../store/actions/favorite.actions';
import { Observable } from 'rxjs';
import { getDashboardItemVisualization } from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
  @Input()
  dashboardItem: DashboardItem;

  visualization$: Observable<Visualization>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    if (this.dashboardItem) {
      const favoriteType = camelCase(this.dashboardItem.type);
      const favorite = this.dashboardItem[favoriteType];

      if (isPlainObject(favorite)) {
        this.store.dispatch(
          loadFavorite({
            favorite,
            favoriteType,
            dashboardItemId: this.dashboardItem.id
          })
        );
      }

      this.visualization$ = this.store.pipe(
        select(
          getDashboardItemVisualization(
            this.dashboardItem,
            favorite ? favorite.id : undefined
          )
        )
      );
    }
  }
}
