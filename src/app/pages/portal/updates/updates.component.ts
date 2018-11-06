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

  @Input() allNews: any;
  news: any;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.allNews.forEach((news) => {
        if (news.id === params['id']) {
          this.news = news;
        }
      });
    });
  }

}
