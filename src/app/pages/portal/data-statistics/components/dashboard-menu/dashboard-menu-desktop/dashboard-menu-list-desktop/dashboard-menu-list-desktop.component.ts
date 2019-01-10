import { Component, Input, OnInit } from "@angular/core";
import { DashboardMenuItem } from "../../../../../../../store/dashboard/dashboard.state";
import { AppState } from "../../../../../../../store/app.reducers";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-dashboard-menu-list-desktop",
  templateUrl: "./dashboard-menu-list-desktop.component.html",
  styleUrls: ["./dashboard-menu-list-desktop.component.css"]
})
export class DashboardMenuListDesktopComponent implements OnInit {
  @Input() slideCss = "";
  @Input() priority: string;
  @Input() menuApiUrl: string;
  @Input() dashboardMenuItems: DashboardMenuItem[];
  @Input() menus: any;
  currentMenu: string;
  activeMenu: string;
  activeSubMenu: string;
  activeMainMenu: string;
  subMenus: any;
  isSubMenuSet: boolean;
  keyedDashboardMenus = {};
  public allDashboardMenus: any;
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.isSubMenuSet = false;
  }

  ngOnInit() {
    if (this.dashboardMenuItems) {
      this.route.params.forEach((params: Params) => {
        this.activeSubMenu = params["id"];
        this.activeMainMenu = params["mainMenuId"];
        this.getMenuAndSubMenu(this.dashboardMenuItems);
      });
    }
  }

  getMenuAndSubMenu(dashboardItems) {
    if (dashboardItems && this.menuApiUrl) {
      this.http.get(this.menuApiUrl).subscribe(menuData => {
        menuData["dashboardMenus"].forEach(mainMenu => {
          if (mainMenu["subMenu"].length === 0) {
            this.keyedDashboardMenus[mainMenu.id] = mainMenu.name;
          }
          mainMenu.subMenu.forEach(subMenu => {
            // this.keyedDashboardMenus[subMenu.id] = subMenu.displayName;
            dashboardItems.forEach(item => {
              if (item.id === subMenu.id) {
                subMenu.dashItem = item;
              }
            });
          });
        });
        this.allDashboardMenus = menuData["dashboardMenus"];
        this.route.params.forEach((params: Params) => {
          const id = params["id"];
          this.setActiveMenu(id, this.allDashboardMenus);
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
    allDashboardMenus.forEach(mainMenu => {
      if (mainMenu["subMenu"] && mainMenu.id === id) {
        this.subMenus = mainMenu["subMenu"];
      }
    });
  }

  setSubMenuActiveClass(subMenuId, allDashboardMenus) {
    console.log("clicked menu", subMenuId);
    let mainMenuId = "";
    allDashboardMenus.forEach(mainMenu => {
      mainMenu["subMenu"].forEach(subMenu => {
        if (subMenu.id === subMenuId) {
          mainMenuId = mainMenu.id;
          console.log("main", mainMenuId);
        }
      });
    });
  }

  getMainMenuId(subMenuId, allDashboardMenus) {
    let mainMenuId = "";
    allDashboardMenus.forEach(mainMenu => {
      mainMenu["subMenu"].forEach(subMenu => {
        if (subMenu.id === subMenuId) {
          mainMenuId = mainMenu.id;
        }
      });
    });
    return mainMenuId;
  }
}
