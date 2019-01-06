import {Component, Input, OnInit} from '@angular/core';
import { FeedBack} from '../../../../model/feedback';
import { Observable } from 'rxjs';
import { FeedBacksState } from '../../../../store/portal/portal.state';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import * as portalActions from '../../../../store/portal/portal.actions';
import { getFeedBacks } from '../../../../store/portal/portal.selectors';
import { HttpClientService } from '../../../../modules/map/services';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-top-header-menu',
  templateUrl: './top-header-menu.component.html',
  styleUrls: ['./top-header-menu.component.css']
})
export class TopHeaderMenuComponent implements OnInit {

  @Input() portalConfigurations: any;
  @Input() allNews: any;
  feedbackIsSet: boolean;
  pages: Array<any>;
  headerInfo: any;
  feedBackModel: any;
  feedBacksArray: any;
  feedBacks$: Observable<FeedBacksState>;
  updateStatus: any = {
    'httpStatus': ''
  };
  sendingFeedback: boolean;
  constructor(private store: Store<AppState>, private httpClientService: HttpClientService) {
    store.dispatch(new portalActions.LoadFeedbacksAction);
    this.feedBacks$ = store.select(getFeedBacks);
    this.feedbackIsSet = false;
    this.sendingFeedback = false;
  }

  ngOnInit() {
    if (this.portalConfigurations) {
      this.headerInfo = this.portalConfigurations['header'];
      this.feedBackModel = new FeedBack('','','','');
      if (this.feedBacks$) {
        this.feedBacks$.subscribe((feedBacksObj) => {
          if (feedBacksObj) {
            this.feedBacksArray = feedBacksObj;
          }
        })
      }
    }
  }

  executeForNavigation () {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  submitFeedback(feedBacks) {
    this.sendingFeedback = true;
    const newFeedBacks = {
      feedBacks: []
    };
    feedBacks['feedBacks'].forEach((feedback) =>{
      if (feedback) {
        newFeedBacks.feedBacks.push(feedback);
      }
    });
    newFeedBacks.feedBacks.push(this.feedBackModel)
    console.log(newFeedBacks);
    this.httpClientService.put('dataStore/observatory/faqs.json', newFeedBacks).subscribe((message) => {
      console.log(this.updateStatus);
      if (message && message['httpStatus']=== 'OK') {
        this.sendingFeedback = false;
        this.updateStatus = message;
        this.updateStatus['httpStatus'] = 'Successfully sent';
        this.feedBackModel = new FeedBack('', '', '', '');
        const timing = timer(1000, 2000);
        const time = timing.subscribe((seconds) => {
          if (seconds === 2) {
            this.toggleFeedback();
            this.updateStatus = {};
          }
        });
      }

    })
  }

  toggleFeedback() {
    this.feedbackIsSet = !this.feedbackIsSet;
  }
}
