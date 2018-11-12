import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DashboardMenuItem} from '../../../../../../store/dashboard/dashboard.state';
import {AppState} from '../../../../../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as dashboardSelectors from '../../../../../../store/dashboard/dashboard.selectors';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';

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
  constructor(private store: Store<AppState>, private http: HttpClient, private route: ActivatedRoute) {
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
        this.route.params.forEach((params: Params) => {
          const id = params['id'];
          console.log('params', id);
          const items = document.getElementsByClassName('menu-btn');
          for (let count = 0; count < items.length; count++) {
            if (items[count].id !== '') {
              document.getElementById(items[count].id).style.backgroundColor = '#FFF';
              document.getElementById(items[count].id).style.color = '#6EB3E2';
            }
          }
          document.getElementById(id).style.backgroundColor = '#6EB3E2';
          document.getElementById(id).style.color = '#FFF';
        });
      });
    }
  }

  setActiveClass(id) {
    const items = document.getElementsByClassName('menu-btn');
    for (let count = 0; count < items.length; count++) {
      if (items[count].id !== '') {
        document.getElementById(items[count].id).style.backgroundColor = '#FFF';
        document.getElementById(items[count].id).style.color = '#000';
      }
    }

    const mainMenuItems = document.getElementsByClassName('main-menu-btn');
    for (let count = 0; count < mainMenuItems.length; count++) {
      if (items[count].id !== '') {
        document.getElementById(mainMenuItems[count].id).style.backgroundColor = '#FFF';
        document.getElementById(mainMenuItems[count].id).style.color = '#000';
      }
    }
    document.getElementById(id).style.backgroundColor = '#FFF';
    document.getElementById(id).style.color = '#000';
  }

  setStylesMainMenu(id) {
    const mainMenuItems = document.getElementsByClassName('main-menu-btn');
    for (let count = 0; count < mainMenuItems.length; count++) {
      if (mainMenuItems[count].id !== '') {
        document.getElementById(mainMenuItems[count].id).style.backgroundColor = '#FFF';
        document.getElementById(mainMenuItems[count].id).style.color = '#000';
      }
    }
    const items = document.getElementsByClassName('menu-btn');
    for (let count = 0; count < items.length; count++) {
      if (items[count].id !== '') {
        document.getElementById(items[count].id).style.backgroundColor = '#FFF';
        document.getElementById(items[count].id).style.color = '#000';
      }
    }
    document.getElementById(id).style.backgroundColor = '#6EB3E2';
    document.getElementById(id).style.color = '#FFF';
  }
}
