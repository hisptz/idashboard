import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducers";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  ExternalSourcesState,
  StatsSummaryState,
  PortalViewsState
} from "../../../store/portal/portal.state";
import { Observable } from "rxjs/index";
import {
  getDataFromExternalSource,
  getStatsSummary,
  getPortalViews
} from "../../../store/portal/portal.selectors";
import * as portalActions from "../../../store/portal/portal.actions";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { DeviceDetectorService } from "ngx-device-detector";
import { DatePipe } from "@angular/common";
import { HttpClientService } from "../../../services/http-client.service";

import * as _ from "lodash";

@Component({
  selector: "app-updates",
  templateUrl: "./updates.component.html",
  styleUrls: ["./updates.component.css"]
})
export class UpdatesComponent implements OnInit {
  statsSummary$: Observable<StatsSummaryState>;
  allNews: any;
  news: any;
  dataFromExternalSource$: Observable<ExternalSourcesState>;
  activeNewsId: string;
  portalViews$: Observable<PortalViewsState>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    private router: Router,
    private httpClient: HttpClientService
  ) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    this.statsSummary$ = store.select(getStatsSummary);
    this.dataFromExternalSource$ = store.select(getDataFromExternalSource);
  }

  ngOnInit() {
    if (this.statsSummary$) {
      this.statsSummary$.subscribe(summaryInfo => {
        if (summaryInfo) {
          this.allNews = summaryInfo["news"];
          this.route.params.forEach((params: Params) => {
            if (params["id"]) {
              this.activeNewsId = params["id"];
              this.allNews.forEach(news => {
                if (news.id === params["id"]) {
                  this.news = news;
                  this.portalViewersInformation();
                }
              });
            }
          });
        }
      });
    }
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
      .put("../api/dataStore/observatory/portalViews.json", reviews)
      .subscribe(message => {
        console.log(message);
      });
  }
}
