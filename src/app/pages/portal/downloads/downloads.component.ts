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

  openCity(evt, downloadOption) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    console.log('tab links', tablinks);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
      if (tablinks[i].id === 'btn-' + downloadOption) {
        console.log('tablinks[i].id', tablinks[i].id);
        console.log('downloadOption', 'btn-' + downloadOption);
        document.getElementById(tablinks[i].id).classList.add('active');
      }
    }
    document.getElementById(downloadOption).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  trustedUrl(url) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
