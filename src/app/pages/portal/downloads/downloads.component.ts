import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {getDownloads} from '../../../store/portal/portal.selectors';
import * as portalActions from '../../../store/portal/portal.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducers';
import {Observable} from 'rxjs/index';
import {DownloadsState} from '../../../store/portal/portal.state';


@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  downloads$: Observable<DownloadsState>;
  downloads: any;
  constructor(private store: Store<AppState>, private sanitizer: DomSanitizer) {
    store.dispatch(new portalActions.LoadDownloadsAction());
    this.downloads$ = store.select(getDownloads);
  }

  ngOnInit() {
    if (this.downloads$) {
      this.downloads$.subscribe((downloads) => {
        if (downloads) {
          this.downloads = downloads;
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

  openCity(evt, downloadOption) {
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
      if (tablinks[i].id === 'btn-' + downloadOption) {
        try {
          document.getElementById(tablinks[i].id).classList.add('active');
        } catch (e) {
          console.log(e);
        }
      }
    }
    try {
      document.getElementById(downloadOption).style.display = 'block';
      evt.currentTarget.className += ' active';
    } catch (e) {
      console.log(e);
    }
  }

  trustedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
