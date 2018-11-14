import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DownloadsState, FAQState, PortalConfigurationState, StatsSummaryState} from '../../../store/portal/portal.state';
import {Observable} from 'rxjs/index';
import {getDownloads, getFAQs, getPortalConfiguration, getStatsSummary} from '../../../store/portal/portal.selectors';
import {Store} from '@ngrx/store';
import {CurrentUserState} from '../../../store/current-user/current-user.state';
import {getCurrentUser} from '../../../store/current-user/current-user.selectors';
import * as portalActions from '../../../store/portal/portal.actions';
import {AppState} from '../../../store/app.reducers';

@Component({
  selector: 'app-home-portal',
  templateUrl: './home-portal.component.html',
  styleUrls: ['./home-portal.component.css']
})
export class HomePortalComponent implements OnInit {

  portalConfiguration$: Observable<PortalConfigurationState>;
  visualizationObjects$: Observable<any>;
  downloads$: Observable<DownloadsState>;
  portalFAQs$: Observable<FAQState>;
  statsSummary$: Observable<StatsSummaryState>;
  portalConfigurations: any;
  theSetPage: string;
  portalPages: any;
  portalThemes: any;
  allNews: any;
  selectedPageInformation: any;
  statsSummaryGroups: Array<any>;
  currentUser$: Observable<CurrentUserState>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    store.dispatch(new portalActions.LoadDownloadsAction());
    store.dispatch(new portalActions.LoadFAQAction());
    this.currentUser$ = store.select(getCurrentUser);
    this.statsSummary$ = store.select(getStatsSummary);
    this.portalConfiguration$ = store.select(getPortalConfiguration);
    this.downloads$ = store.select(getDownloads);
    this.portalFAQs$ = store.select(getFAQs);
  }

  ngOnInit() {
    if (this.portalConfiguration$) {
      this.route.params.forEach((params: Params) => {
        this.theSetPage = params['id']; const parentId = params['parentId'];
        console.log('parentId', parentId);
        if (!parentId) {
          this.portalConfiguration$.subscribe((portalConfigurations) => {
            if (portalConfigurations) {
              this.portalConfigurations = portalConfigurations;
              this.portalPages = portalConfigurations['pages'];
            }
          });
        }
      });
    }

    if (this.statsSummary$) {
      this.statsSummary$.subscribe((statisticsSummary) => {
        if (statisticsSummary) {
          this.statsSummaryGroups = statisticsSummary.statsSummaryGroups;
          this.portalThemes = statisticsSummary['themes'];
          this.allNews = statisticsSummary['news'];
          this.visualizationObjects$ = statisticsSummary['visualization'];
          const pages = statisticsSummary['pages'];
          this.route.params.forEach((params: Params) => {
            if (params['parentId']) {
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
