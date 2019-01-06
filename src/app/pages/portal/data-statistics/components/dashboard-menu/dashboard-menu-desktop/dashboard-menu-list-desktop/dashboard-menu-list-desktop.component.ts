import {Component, Input, OnInit} from '@angular/core';
import {DashboardMenuItem} from '../../../../../../../store/dashboard/dashboard.state';
import {AppState} from '../../../../../../../store/app.reducers';
import {Store} from '@ngrx/store';
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
  currentMenu: string;
  activeMenu: string;
  subMenus: any;
  isSubMenuSet: boolean;
  keyedDashboardMenus =  {};
  public allDashboardMenus: any;
  constructor(private store: Store<AppState>, private http: HttpClient, private route: ActivatedRoute) {
    this.isSubMenuSet = false;
  }

  ngOnInit() {
    if (this.dashboardMenuItems) {
      this.getMenuAndSubMenu(this.dashboardMenuItems);
    }
  }


  getMenuAndSubMenu(dashboardItems) {
    if (dashboardItems && this.menuApiUrl) {
      this.http.get(this.menuApiUrl).subscribe((menuData) => {
        menuData['dashboardMenus'].forEach((mainMenu) => {
          if (mainMenu['subMenu'].length === 0) {
            this.keyedDashboardMenus[mainMenu.id] = mainMenu.name;
          }
          mainMenu.subMenu.forEach((subMenu) => {
            // this.keyedDashboardMenus[subMenu.id] = subMenu.displayName;
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
          this.setActiveMenu(id, this.allDashboardMenus);
          try {
            const items = document.getElementsByClassName('menu-list-btn');
            for (let count = 0; count < items.length; count++) {
              if (items[count].id !== '') {
                document.getElementById(items[count].id).style.borderBottom = 'none';
                document.getElementById(items[count].id).style.color = '#000';
                // document.getElementById(items[count].id).style.fontWeight = '500';
              }
            }
            document.getElementById(id).style.borderBottom = 'solid 3px #2A8FD1';
            // document.getElementById(id).style.fontWeight = '600';
            document.getElementById('sub-' + id).style.backgroundColor = '#2A8FD1';
            document.getElementById(id).style.color = '#000';
            document.getElementById('sub-' + id).style.color = '#FFF';
          } catch (e) {
            console.log(e);
          }
        });
      });
    }
  }

  setActiveMenu(menuId, allDashboardMenus) {
    this.activeMenu = menuId;
    this.getSubMenu(menuId, allDashboardMenus);
  }

  getSubMenu(id, allDashboardMenus) {
    this.isSubMenuSet = false;
    allDashboardMenus.forEach((mainMenu) => {
      if (mainMenu['subMenu'] && mainMenu.id === id) {
        this.subMenus = mainMenu['subMenu'];
      }
    });
    try {
      const items = document.getElementsByClassName('menu-list-btn');
      for (let count = 0; count < items.length; count++) {
        if (items[count].id !== '') {
          document.getElementById(items[count].id).style.borderBottom = 'none';
          document.getElementById(items[count].id).style.color = '#000';
          // document.getElementById(items[count].id).style.fontWeight = '500';
        }
      }
      document.getElementById(id).style.borderBottom = 'solid 3px #2A8FD1';
      // document.getElementById(id).style.fontWeight = '600';
      document.getElementById('sub-' + id).style.backgroundColor = '#2A8FD1';
      document.getElementById(id).style.color = '#000';
      document.getElementById('sub-' + id).style.color = '#FFF';
      this.isSubMenuSet = true;
    } catch (e) {
      console.log(e);
    }
  }

  setSubMenuActiveClass(id) {
    try {
      const subMenuItems = document.getElementsByClassName('sub-menu-btn');
      for (let count = 0; count < subMenuItems.length; count++) {
        if (subMenuItems[count].id !== '') {
          document.getElementById(subMenuItems[count].id).style.backgroundColor = '#eeeeee';
          document.getElementById(subMenuItems[count].id).style.color = '#000';
        }
      }

      document.getElementById('sub-' + id).style.backgroundColor = '#2A8FD1';
      document.getElementById('sub-' + id).style.color = '#FFF';
    } catch (e) {
      console.log(e);
    }
  }
}
