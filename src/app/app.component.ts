import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import {
  NgxDhis2HttpClientService,
  Manifest
} from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private http: NgxDhis2HttpClientService,
    private titleService: Title
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // Set application title
    this.setTitle('Loading Dashboard...');
  }

  ngOnInit() {
    // TODO Resolve manifest method from http service to avoid duplicate calls
    this.http
      .get('manifest.webapp', { isExternalLink: true })
      .subscribe((manifest: Manifest) => {
        if (manifest) {
          this.setTitle(manifest.name);
        }
      });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
