import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  DownloadsState,
  ExternalSourcesState,
  FAQState,
  PortalConfigurationState,
  StatsSummaryState,
  PortalViewsState
} from "../../../store/portal/portal.state";
import { Observable } from "rxjs/index";
import {
  getDataFromExternalSource,
  getDownloads,
  getFAQs,
  getPortalConfiguration,
  getStatsSummary,
  getPortalViews
} from "../../../store/portal/portal.selectors";
import { Store } from "@ngrx/store";
import { CurrentUserState } from "../../../store/current-user/current-user.state";
import { getCurrentUser } from "../../../store/current-user/current-user.selectors";
import * as portalActions from "../../../store/portal/portal.actions";
import { AppState } from "../../../store/app.reducers";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { DeviceDetectorService } from "ngx-device-detector";
import { DatePipe } from "@angular/common";

import * as _ from "lodash";
import { HttpClientService } from "../../../services/http-client.service";

@Component({
  selector: "app-home-portal",
  templateUrl: "./home-portal.component.html",
  styleUrls: ["./home-portal.component.css"]
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
  location = {};
  dataFromExternalSource$: Observable<ExternalSourcesState>;
  allNews: any;
  selectedPageInformation: any;
  statsSummaryGroups: Array<any>;
  currentUser$: Observable<CurrentUserState>;
  _htmlFromExternalSource: SafeHtml;
  hasScriptSet: boolean;
  deviceInfo = null;
  portalViews$: Observable<PortalViewsState>;
  constructor(
    private store: Store<AppState>,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    private router: Router,
    private httpClient: HttpClientService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef
  ) {
    store.dispatch(new portalActions.LoadStatsSummaryAction());
    store.dispatch(new portalActions.LoadDownloadsAction());
    store.dispatch(new portalActions.LoadFAQAction());
    store.dispatch(
      new portalActions.LoadExtractedDataFromExternalSourcesAction(
        "../portal-middleware/extract/who-factbuffects"
      )
    );
    this.currentUser$ = store.select(getCurrentUser);
    this.statsSummary$ = store.select(getStatsSummary);
    this.portalConfiguration$ = store.select(getPortalConfiguration);
    this.downloads$ = store.select(getDownloads);
    this.portalFAQs$ = store.select(getFAQs);
    this.dataFromExternalSource$ = store.select(getDataFromExternalSource);
  }

  ngOnInit() {
    if (this.portalConfiguration$) {
      this.route.params.forEach((params: Params) => {
        this.theSetPage = params["id"];
        const parentId = params["parentId"];
        if (!parentId) {
          this.portalConfiguration$.subscribe(portalConfigurations => {
            if (portalConfigurations) {
              this.portalConfigurations = portalConfigurations;
              this.portalPages = portalConfigurations["pages"];
              this.portalViewersInformation();
            }
          });
        }
      });
    }

    if (this.statsSummary$) {
      this.statsSummary$.subscribe(statisticsSummary => {
        if (statisticsSummary) {
          this.statsSummaryGroups = statisticsSummary.statsSummaryGroups;
          this.portalThemes = statisticsSummary["themes"];
          this.allNews = statisticsSummary["news"];
          this.visualizationObjects$ = statisticsSummary["visualization"];
          const pages = statisticsSummary["pages"];
          this.route.params.forEach((params: Params) => {
            if (params["parentId"]) {
              pages.forEach(page => {
                if (page.id === params["id"]) {
                  this.selectedPageInformation = page;
                }
              });
            }
          });
        }
      });
    }

    if (this.dataFromExternalSource$) {
      this.dataFromExternalSource$.subscribe(dataFromExternalSource => {
        try {
          this._htmlFromExternalSource = this.sanitizer.bypassSecurityTrustHtml(
            dataFromExternalSource["data"]
          );
          this.hasScriptSet = true;
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      });
    }
  }

  setPosition(position) {
    this.location = position.coords;
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
