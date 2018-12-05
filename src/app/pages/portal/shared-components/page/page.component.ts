import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {StatsSummaryState} from '../../../../store/portal/portal.state';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import * as portalActions from '../../../../store/portal/portal.actions';
import {getCurrentUser} from '../../../../store/current-user/current-user.selectors';
import {getStatsSummary} from '../../../../store/portal/portal.selectors';
import {AppState} from '../../../../store/app.reducers';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  statsSummary$: Observable<StatsSummaryState>;
  selectedPageInformation: any;
  statsSummaryGroups: Array<any>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    this.statsSummary$ = store.select(getStatsSummary);
  }

  ngOnInit() {
    if (this.statsSummary$) {
      this.statsSummary$.subscribe((statisticsSummary) => {
        if (statisticsSummary) {
          this.statsSummaryGroups = statisticsSummary.statsSummaryGroups;
          const pages = statisticsSummary['pages'];
          this.route.params.forEach((params: Params) => {
            if (params['id']) {
              pages.forEach((page) => {
                if (page.id === params['id']) {
                  this.selectedPageInformation = page;
                }
              });
            }
          });
        }
      });
    }
  }

}
