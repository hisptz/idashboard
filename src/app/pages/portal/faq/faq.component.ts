import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import * as portalActions from "../../../store/portal/portal.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducers";
import { Observable } from "rxjs/index";
import { FAQState, PortalViewsState } from "../../../store/portal/portal.state";
import {
  getFAQs,
  getPortalViews
} from "../../../store/portal/portal.selectors";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { DeviceDetectorService } from "ngx-device-detector";
import { DatePipe } from "@angular/common";
import { HttpClientService } from "../../../services/http-client.service";

import * as _ from "lodash";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FaqComponent implements OnInit {
  portalFAQs: any;
  portalFAQs$: Observable<FAQState>;
  activeDivId: string;
  activeQuestionId: string;
  portalViews$: Observable<PortalViewsState>;
  constructor(
    private store: Store<AppState>,
    private faqSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    private router: Router,
    private httpClient: HttpClientService
  ) {
    store.dispatch(new portalActions.LoadFAQAction());
    this.portalFAQs$ = store.select(getFAQs);
  }

  ngOnInit() {
    if (this.portalFAQs$) {
      this.portalFAQs$.subscribe(faq => {
        if (faq) {
          this.route.params.forEach((params: Params) => {
            this.activeDivId = params["id"];
            this.activeQuestionId = params["qnId"];
            this.portalFAQs = faq;
            this.portalViewersInformation();
          });
        }
      });
    }
  }

  showQuestionsById(id) {
    this.activeDivId = id;
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
