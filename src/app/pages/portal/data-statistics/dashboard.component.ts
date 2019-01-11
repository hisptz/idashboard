import { Component, HostListener, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducers";
import * as visualizationSelectors from "../../../store/visualization/visualization.selectors";
import { CurrentUserState } from "../../../store/current-user/current-user.state";
import { getCurrentUser } from "../../../store/current-user/current-user.selectors";
import { Observable } from "rxjs";
import { Visualization } from "../../../store/visualization/visualization.state";
import {
  WELCOMING_DESCRIPTION,
  WELCOMING_TITLE
} from "../../../constants/welcoming-messages.constants";
import { Dashboard } from "../../../store/dashboard/dashboard.state";
import { getCurrentDashboard } from "../../../store/dashboard/dashboard.selectors";
import { DeviceDetectorService } from "ngx-device-detector";
import { DatePipe } from "@angular/common";
import { HttpClientService } from "../../../services/http-client.service";
import { Router } from "@angular/router";

import * as portalActions from "../../../store/portal/portal.actions";

import * as _ from "lodash";
import { PortalViewsState } from "../../../store/portal/portal.state";
import { getPortalViews } from "../../../store/portal/portal.selectors";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  visualizationObjects$: Observable<Visualization[]>;
  currentUser$: Observable<CurrentUserState>;
  visualizationLoading$: Observable<boolean>;
  currentDashboard$: Observable<Dashboard>;
  welcomingTitle: string;
  welcomingDescription: string;
  emptyVisualizationMessage: string;

  portalViews$: Observable<PortalViewsState>;

  constructor(
    private store: Store<AppState>,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    private router: Router,
    private httpClient: HttpClientService
  ) {
    this.visualizationObjects$ = store.select(
      visualizationSelectors.getCurrentDashboardVisualizationObjects
    );
    this.currentUser$ = store.select(getCurrentUser);
    this.visualizationLoading$ = store.select(
      visualizationSelectors.getVisualizationLoadingState
    );
    this.currentDashboard$ = store.select(getCurrentDashboard);
    this.welcomingTitle = WELCOMING_TITLE;
    this.welcomingDescription = WELCOMING_DESCRIPTION;
    this.emptyVisualizationMessage =
      "There are no items on this data-statistics, search for charts, tables, maps and many more and add them to your data-statistics";
  }

  ngOnInit() {
    this.portalViewersInformation();
  }

  portalViewersInformation() {
    this.httpClient
      .get("dataStore/observatory/portalViews.json")
      .subscribe(portalViews => {
        if (portalViews) {
          const portalViewsInfo = portalViews;
          const theDate = new Date();
          let newPortalViews = {
            portalViews: []
          };
          this.httpClient.get("system/id.json?").subscribe(systemIds => {
            const uniqueIdObj = {
              uniqueId: ""
            };
            if (systemIds) {
              if (JSON.parse(localStorage.getItem("identifier"))) {
                uniqueIdObj.uniqueId = JSON.parse(
                  localStorage.getItem("identifier")
                ).uniqueId;
              } else {
                uniqueIdObj.uniqueId = systemIds["codes"][0];
              }
              const viewsObject = {
                id: uniqueIdObj.uniqueId,
                viewDate: this.transformDate(theDate),
                page: this.router.url,
                userAgent: this.deviceService.getDeviceInfo(),
                isMobile: this.deviceService.isMobile(),
                isTablet: this.deviceService.isTablet(),
                isDesktop: this.deviceService.isDesktop()
              };
              if (
                _.filter(portalViewsInfo["portalViews"], {
                  viewDate: this.transformDate(theDate),
                  page: this.router.url
                }).length > 0
              ) {
                // check if the its from the same user and hence do not send, otherwise send
                // 1. local storage get local storage
                console.log(JSON.parse(localStorage.getItem("identifier")));
                if (
                  _.filter(portalViewsInfo["portalViews"], {
                    id: JSON.parse(localStorage.getItem("identifier")).uniqueId,
                    page: this.router.url
                  }).length > 0
                ) {
                  // info from this user already stored
                  console.log("already stored");
                } else {
                  // send because its for not this user
                  portalViewsInfo["portalViews"].forEach(portalView => {
                    newPortalViews.portalViews.push(portalView);
                  });
                  viewsObject.id = JSON.parse(
                    localStorage.getItem("identifier")
                  ).uniqueId;
                  newPortalViews.portalViews.push(viewsObject);
                  this.sendUserReviews(newPortalViews);
                }
              } else {
                // not available hence set localstorage and send
                localStorage.setItem("identifier", JSON.stringify(uniqueIdObj));
                portalViewsInfo["portalViews"].forEach(portalView => {
                  newPortalViews.portalViews.push(portalView);
                });
                newPortalViews.portalViews.push(viewsObject);
                this.sendUserReviews(newPortalViews);
                this.sendUserReviews(newPortalViews);
              }
            }
          });
        }
      });
  }

  transformDate(date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  sendUserReviews(reviews) {
    this.httpClient
      .put("dataStore/observatory/portalViews.json", reviews)
      .subscribe(message => {
        console.log(message);
      });
  }
}
