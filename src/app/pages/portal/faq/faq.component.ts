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
  constructor(private store: Store<AppState>, private faqSanitizer: DomSanitizer) {
    store.dispatch(new portalActions.LoadFAQAction());
    this.portalFAQs$ = store.select(getFAQs);
  }

  ngOnInit() {
    if (this.portalFAQs$) {
      this.portalFAQs$.subscribe((faq) => {
        if (faq) {
          this.portalFAQs = faq;
          console.log('CAINAM FAQS TS: ' + JSON.stringify(this.portalFAQs));
        }
      });
    }
  }

  openOtherFAQItems(event, id) {
    console.log("I'm CLicked By Cainam");
  }

  openCity(evt, elementID, data) {
    if (data.faq.faqMenu.id === elementID) {
      console.log('CAINAM TESTING: ' + JSON.stringify(data.faq.faqMenu.id));
    } else {
      console.log('CAINAM TESTING: ' + JSON.stringify(data.faq));
    }

    // let i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName('tabcontent');
    // for (i = 0; i < tabcontent.length; i++) {

    // }

    // document.getElementById(tabIndex).style.display = 'block';
    // evt.currentTarget.className += ' active';
  }

  trustedUrl(url) {
    console.log(url);
    return this.faqSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
