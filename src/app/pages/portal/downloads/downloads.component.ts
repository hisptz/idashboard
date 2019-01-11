import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  getDownloads,
  getPortalViews
} from "../../../store/portal/portal.selectors";
import * as portalActions from "../../../store/portal/portal.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducers";
import { Observable } from "rxjs/index";
import {
  DownloadsState,
  PortalViewsState
} from "../../../store/portal/portal.state";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { timer } from "rxjs/observable/timer";
import { DeviceDetectorService } from "ngx-device-detector";
import { DatePipe } from "@angular/common";

import * as _ from "lodash";
import { HttpClientService } from "../../../services/http-client.service";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.component.html",
  styleUrls: ["./downloads.component.css"]
})
export class DownloadsComponent implements OnInit {
  downloads$: Observable<DownloadsState>;
  downloads: any;
  ativeDownloadOption: string;
  activeId: string;
  activeMenuId: string;
  currentRoute: any;
  iframeStatus: any;
  portalViews$: Observable<PortalViewsState>;
  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    private router: Router,
    private httpClient: HttpClientService
  ) {
    store.dispatch(new portalActions.LoadDownloadsAction());
    this.downloads$ = store.select(getDownloads);
  }

  ngOnInit() {
    if (this.downloads$) {
      this.downloads$.subscribe(downloads => {
        if (downloads) {
          this.downloads = downloads;
          this.route.params.forEach((params: Params) => {
            this.activeId = params["id"];
            this.activeMenuId = params["menuId"];
            this.ativeDownloadOption = params["subMenu"];
            this.currentRoute = this.router.url.replace(this.activeId, "");
            this.portalViewersInformation();
            // const timing = timer(1000, 2000);
            // const time = timing.subscribe(seconds => {
            //   this.iframeStatus = document.getElementsByClassName(
            //     ".flip-embedded"
            //   );
            //   console.log(seconds);
            //   console.log("iframe", this.iframeStatus);
            // });
          });
        }
      });
    }
  }

  getOtherDownloads(firstDownload, allDownloads) {
    const otherDownloads = [];
    allDownloads.forEach(download => {
      if (download.id !== firstDownload.id) {
        otherDownloads.push(download);
      }
    });
    if (otherDownloads.length > 0) {
      return otherDownloads;
    }
  }

  trustedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
