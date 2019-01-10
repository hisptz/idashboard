import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { getDownloads } from "../../../store/portal/portal.selectors";
import * as portalActions from "../../../store/portal/portal.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducers";
import { Observable } from "rxjs/index";
import { DownloadsState } from "../../../store/portal/portal.state";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { timer } from "rxjs/observable/timer";

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
  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
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
            const timing = timer(1000, 2000);
            const time = timing.subscribe(seconds => {
              this.iframeStatus = document.getElementsByClassName(
                ".flip-embedded"
              );
              console.log(seconds);
              console.log("iframe", this.iframeStatus);
            });
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
}
