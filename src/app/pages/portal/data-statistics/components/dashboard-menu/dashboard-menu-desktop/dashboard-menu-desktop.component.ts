import {Component, HostListener, Input, OnInit} from '@angular/core';
import * as dashboard from '../../../../../../store/dashboard/dashboard.actions';
import * as dashboardSelectors from '../../../../../../store/dashboard/dashboard.selectors';
import {AppState} from '../../../../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DashboardMenuItem} from '../../../../../../store/dashboard/dashboard.state';
import {ManifestService} from '../../../../../../services/manifest.service';

@Component({
  selector: 'app-dashboard-menu-desktop',
  templateUrl: './dashboard-menu-desktop.component.html',
  styleUrls: ['./dashboard-menu-desktop.component.css']
})
export class DashboardMenuDesktopComponent implements OnInit {

  currentDashboardPage$: Observable<number>;
  dashboardPages$: Observable<number>;
  dashboardMenuItems$: Observable<DashboardMenuItem[]>;
  showBookmarked$: Observable<boolean>;
  searchTerm: string;
  menuUrl: string;
  priority: string;
  @Input() theMenus: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.organizeMenu(event.target.innerWidth);
  }
  constructor(private store: Store<AppState>, private manifestService: ManifestService) {
    this.showBookmarked$ = store.select(dashboardSelectors.getShowBookmarkedStatus);
    this.dashboardMenuItems$ = this.store.select(dashboardSelectors.getDashboardMenuItems);
    this.currentDashboardPage$ = store.select(dashboardSelectors.getCurrentDashboardPage);
    this.dashboardPages$ = store.select(dashboardSelectors.getDashboardPages);
    this.organizeMenu(window.innerWidth);
  }

  ngOnInit() {
    this.priority = 'first';
    this.manifestService.getRootUrl().subscribe((rootUrl) => {
      this.menuUrl = '../../../' + rootUrl.split('/')[3] + '/api/25/dataStore/observatory/dashboardMenu.json?';
      // this.menuUrl = `api/25/dataStore/observatory/dashboardMenu.json?`;
    });
  }

  getPreviousPage(e) {
    e.stopPropagation();
    this.store.dispatch(new dashboard.ChangeCurrentPageAction(-1));
  }

  getNextPage(e) {
    e.stopPropagation();
    this.store.dispatch(new dashboard.ChangeCurrentPageAction(1));
  }

  onDashboardSearch(searchQuery) {
    this.searchTerm = searchQuery;
    this.store.dispatch(new dashboard.SetSearchTermAction(searchQuery));
  }

  organizeMenu(width: number, forceReduce: boolean = false) {
    let itemsPerPage = 15;
    const additionalWidth =  0;
    // const approximatedItemsPerPage: number = (width - additionalWidth) / 100;
    const approximatedItemsPerPage = 12;

    if (approximatedItemsPerPage >= 1 && approximatedItemsPerPage <= 15) {
      itemsPerPage = parseInt(approximatedItemsPerPage.toFixed(0), 10);
    } else if (approximatedItemsPerPage < 1) {
      itemsPerPage = 1;
    }

    this.store.dispatch(new dashboard.ChangePageItemsAction(itemsPerPage));
  }

  onToggleBookmark() {
    this.store.dispatch(new dashboard.ToggleBookmarkedAction());
  }
}
