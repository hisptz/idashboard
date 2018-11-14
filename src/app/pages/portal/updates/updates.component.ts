import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {ActivatedRoute, Params} from '@angular/router';
import {StatsSummaryState} from '../../../store/portal/portal.state';
import {Observable} from 'rxjs/index';
import {getStatsSummary} from '../../../store/portal/portal.selectors';
import * as portalActions from '../../../store/portal/portal.actions';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {

  statsSummary$: Observable<StatsSummaryState>;
  allNews: any;
  news: any;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    this.statsSummary$ = store.select(getStatsSummary);
  }

  ngOnInit() {
    if (this.statsSummary$) {
      this.statsSummary$.subscribe((summaryInfo) => {
        if (summaryInfo) {
          this.allNews = summaryInfo['news'];
          this.route.params.forEach((params: Params) => {
            if (params['id']) {
              this.allNews.forEach((news) => {
                if (news.id === params['id']) {
                  this.news = news;
                }
              });
            }
          });
        }
      });
    }
  }

}
