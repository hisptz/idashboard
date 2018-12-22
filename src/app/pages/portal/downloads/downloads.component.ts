import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {getDownloads} from '../../../store/portal/portal.selectors';
import * as portalActions from '../../../store/portal/portal.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {Observable} from 'rxjs/index';
import {DownloadsState} from '../../../store/portal/portal.state';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  downloads$: Observable<DownloadsState>;
  downloads: any;
  ativeDownloadOption: string;
  activeId: string;
  constructor(private store: Store<AppState>, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    store.dispatch(new portalActions.LoadDownloadsAction());
    this.downloads$ = store.select(getDownloads);
  }

  ngOnInit() {
    if (this.downloads$) {
      this.downloads$.subscribe((downloads) => {
        if (downloads) {
          this.downloads = downloads;
          this.route.params.forEach((params: Params) => {
            this.setActiveArea(params['subMenu'] + '-btn');
            this.activeDownloadClass(params['menuId']);
            this.setDownloadOptionActiveClass(params['subMenu']);
            this.activeId = params['id'];
            this.ativeDownloadOption = params['subMenu'];
          });
        }
      });
    }
  }

  getOtherDownloads(firstDownload, allDownloads) {
    const otherDownloads = [];
    allDownloads.forEach((download) => {
      if (download.id !== firstDownload.id) {
        otherDownloads.push(download);
      }
    });
    if (otherDownloads.length > 0) {
      return otherDownloads;
    }
  }

  openActiveArea(evt, downloadOption) {
    let i, tabcontent, tablinks;
    try {
      tabcontent = document.getElementsByClassName('tabcontent');
    } catch (e) {
      console.log(e);
    }
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    try {
      tablinks = document.getElementsByClassName('tablinks');
    } catch (e) {
      console.log(e);
    }
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
      this.route.params.forEach((params: Params) => {
        if (tablinks[i].id === 'btn-' + params['menuId']) {
          try {
            document.getElementById(tablinks[i].id).classList.add('active');
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
    try {
      document.getElementById(downloadOption).style.display = 'block';
      evt.currentTarget.className += ' active';
    } catch (e) {
      console.log(e);
    }
  }

  setActiveMenuById(menuId) {
      const navTabs = document.getElementsByClassName('downloads-menus');
      if (navTabs.length > 0) {
        for (let i = 0; i < navTabs.length; i++) {
          document.getElementById(navTabs[i].id).classList.remove('active');
          this.route.params.forEach((params: Params) => {
            if (navTabs[i].id === params['menuId'] + '-tab') {
              try {
                document.getElementById(navTabs[i].id).classList.add('active');
              } catch (e) {
                console.log(e);
              }
            }
          });
        }
      }
    // return 'active';
  }

  trustedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  activeDownloadClass(id) {
    const navTabs = document.getElementsByClassName('downloads-list');
    if (navTabs.length > 0) {
      for (let i = 0; i < navTabs.length; i++) {
        document.getElementById(navTabs[i].id).classList.remove('active-downloads-list');
        this.route.params.forEach((params: Params) => {
          if (navTabs[i].id === params['menuId'] + '-div') {
            try {
              document.getElementById(navTabs[i].id).classList.add('active-downloads-list');
            } catch (e) {
              console.log(e);
            }
            return 'active-downloads-list';
          } else if (navTabs[i].id === params['menuId'] + '-list') {
            try {
              document.getElementById(navTabs[i].id).classList.add('active-downloads-list');
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    }
  }

  setActiveArea(id) {
    console.log('id', id);
    const navTabs = document.getElementsByClassName('btns-sub-menu');
    if (navTabs.length > 0) {
      for (let i = 0; i < navTabs.length; i++) {
        document.getElementById(navTabs[i].id).classList.remove('active');
        this.route.params.forEach((params: Params) => {
          if (navTabs[i].id === params['subMenu'] + '-btn') {
            try {
              document.getElementById(navTabs[i].id).classList.add('active');
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    }
  }

  setDownloadOptionActiveClass(id) {
    const navTabs = document.getElementsByClassName('downloads-list-option');
    if (navTabs.length > 0) {
      for (let i = 0; i < navTabs.length; i++) {
        document.getElementById(navTabs[i].id).classList.remove('active-downloads-list');
          if (navTabs[i].id === id + '-sub-menu-list') {
            try {
              document.getElementById(navTabs[i].id).classList.add('active-downloads-list');
              // console.log(document.getElementById(navTabs[i].id).classList)
            } catch (e) {
              console.log(e);
            }
          }
      }
    }
  }
}
