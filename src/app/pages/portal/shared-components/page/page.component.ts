import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { StatsSummaryState } from "../../../../store/portal/portal.state";
import { Observable } from "rxjs/index";
import { Store } from "@ngrx/store";
import * as portalActions from "../../../../store/portal/portal.actions";
import { getCurrentUser } from "../../../../store/current-user/current-user.selectors";
import { getStatsSummary } from "../../../../store/portal/portal.selectors";
import { AppState } from "../../../../store/app.reducers";

import * as _ from "lodash";
import { HttpClientService } from "../../../../services/http-client.service";

import * as dashboard from "../../../../store/dashboard/dashboard.actions";
import { getDashboardGroupedVisualizationObjects } from "../../../../store/visualization/visualization.selectors";
import { CurrentUserState } from "../../../../store/current-user/current-user.state";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.css"]
})
export class PageComponent implements OnInit {
  statsSummary$: Observable<StatsSummaryState>;
  selectedPageInformation: any;
  statsSummaryGroups: Array<any>;
  selectedPageId: string;
  selectedPageName: string;
  pageCategory: string;
  subPageCategory: string;
  groupedDashboards$: Observable<any>;
  currentUser$: Observable<CurrentUserState>;
  dashboardAccess: {
    delete: true;
    externalize: true;
    manage: true;
    read: true;
    update: true;
    write: true;
  };
  constructor(
    private store: Store<AppState>,
    private httpClientService: HttpClientService,
    private route: ActivatedRoute
  ) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    this.statsSummary$ = store.select(getStatsSummary);
    this.currentUser$ = store.select(getCurrentUser);
  }

  ngOnInit() {
    if (this.statsSummary$) {
      this.statsSummary$.subscribe(statisticsSummary => {
        if (statisticsSummary) {
          this.statsSummaryGroups = statisticsSummary.statsSummaryGroups;
          const pages = statisticsSummary["pages"];
          this.route.params.forEach((params: Params) => {
            this.pageCategory = params["pageCategory"];
            this.subPageCategory = params["subCategory"];
            this.selectedPageId = params["id"];
            this.selectedPageInformation = [];
            _.filter(statisticsSummary.statsSummaryGroups, {
              id: params["pageCategory"]
            })[0]["dataGroups"].forEach(dataGroup => {
              if (dataGroup.id === params["subCategory"]) {
                this.selectedPageName = dataGroup["name"];
                dataGroup["statistics"].forEach(stats => {
                  this.selectedPageInformation.push(stats);
                });
                console.log(
                  "check",
                  _.filter(statisticsSummary["themes"], {
                    programId: params["subCategory"]
                  })
                );
                _.filter(statisticsSummary["themes"], {
                  programId: params["subCategory"]
                }).forEach(theme => {
                  console.log("theme", theme);
                  this.selectedPageInformation.push(theme);
                  console.log(
                    "this.selectedPageInformation",
                    this.selectedPageInformation
                  );
                });
                this.selectedPageInformation.forEach(pageInfo => {
                  if (
                    pageInfo.id === this.selectedPageId &&
                    pageInfo.dashboardItems
                  ) {
                    this.getData(pageInfo.dashboardItems);
                  }
                });
              }
            });
          });
        }
      });
    }
  }

  getData(dashboarItems) {
    const dashboardItemsArr = [];
    dashboarItems.forEach(item => {
      this.groupedDashboards$ = this.store.select(
        getDashboardGroupedVisualizationObjects
      );
      if (this.groupedDashboards$) {
        this.groupedDashboards$.subscribe(dashboardItemsLoaded => {
          if (dashboardItemsLoaded) {
            if (
              _.filter(dashboardItemsLoaded, {
                id: item.id
              }).length > 0
            ) {
              // we have data on the array of data used on screen view
            } else {
              this.httpClientService
                .get(
                  "dashboardItems/" +
                    item.id +
                    ".json?fields=id,name,type," +
                    item.type +
                    "[id,displayName],reports,shape,resources"
                )
                .subscribe(dashboardItem => {
                  dashboardItemsArr.push(dashboardItem);
                  if (dashboardItemsArr.length > 0) {
                    this.store.dispatch(
                      new dashboard.SetAllDashboardsAction(dashboardItemsArr)
                    );
                    this.groupedDashboards$ = this.store.select(
                      getDashboardGroupedVisualizationObjects
                    );
                  }
                });
            }
          }
        });
      }
    });
  }
}
