import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DashboardMenuItem} from '../../../../../../store/dashboard/dashboard.state';
import {AppState} from '../../../../../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as dashboardSelectors from '../../../../../../store/dashboard/dashboard.selectors';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-menu-list-desktop',
  templateUrl: './dashboard-menu-list-desktop.component.html',
  styleUrls: ['./dashboard-menu-list-desktop.component.css']
})
export class DashboardMenuListDesktopComponent implements OnInit {

  @Input() slideCss = '';
  @Input() priority: string;
  @Input() menuApiUrl: string;
  @Input() dashboardMenuItems: DashboardMenuItem[];
  @Input() menus: any;
  public allDashboardMenus: any;
  constructor(private store: Store<AppState>, private http: HttpClient) {
  }

  ngOnInit() {
    if (this.dashboardMenuItems) {
      this.getMenuAndSubMenu(this.dashboardMenuItems);
    }
  }


  getMenuAndSubMenu(dashboardItems) {
    if (dashboardItems && this.menuApiUrl) {
      console.log('URL', this.menuApiUrl);
      this.http.get(this.menuApiUrl).subscribe((menuData) => {
        console.log('Menu data', menuData);
        menuData['dashboardMenus'].forEach((mainMenu) => {
          mainMenu.subMenu.forEach((subMenu) => {
            dashboardItems.forEach((item) => {
              if (item.id === subMenu.id) {
                subMenu.dashItem = item;
              }
            });
          });
        });
        this.allDashboardMenus = menuData['dashboardMenus'];
      });
    }
  }
}
