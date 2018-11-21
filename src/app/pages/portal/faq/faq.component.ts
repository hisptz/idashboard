import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as portalActions from '../../../store/portal/portal.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {Observable} from 'rxjs/index';
import {FAQState} from '../../../store/portal/portal.state';
import {getFAQs} from '../../../store/portal/portal.selectors';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  portalFAQs: any;
  portalFAQs$: Observable<FAQState>;
  activeDivId: string;
  constructor(private store: Store<AppState>, private faqSanitizer: DomSanitizer) {
    store.dispatch(new portalActions.LoadFAQAction());
    this.portalFAQs$ = store.select(getFAQs);
  }

  ngOnInit() {
    if (this.portalFAQs$) {
      this.portalFAQs$.subscribe((faq) => {
        if (faq) {
          this.activeDivId = faq['faq']['faqMenu'][0].id;
          console.log('active id', this.activeDivId)
          this.portalFAQs = faq;
        }
      });
    }
  }

  shownQuestionsById(id) {
    this.activeDivId = id;
  }

}
