import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from 'rxjs/Observable';
import {ManifestService} from './manifest.service';
export interface SystemInfo {
  rootUrl: string;
  currentVersion: number;
}
@Injectable()
export class SystemInfoService {

  constructor(
    private http: HttpClientService,
    private manifestService: ManifestService
  ) { }

  load(): Observable<SystemInfo> {
    return Observable.create(observer => {
      this.manifestService.getRootUrl().subscribe((rootUrl: string) => {
        console.log(rootUrl)
        this.http.get(rootUrl + 'api/system/info')
          .subscribe((systemInfo: any) => {
            observer.next({
              rootUrl: rootUrl,
              apiRootUrl: this._getApiRootUrl(rootUrl  + 'api/', systemInfo.version, '2.25'),
              currentVersion: systemInfo.version
            });
            observer.complete();
          }, systemInfoError => observer.error(systemInfoError))
      }, manifestError => observer.error(manifestError))
    })
  }

  private _getApiRootUrl(url, currentVersion, maxSupportedVersion) {
    let initialApiVersion = url;

    if (currentVersion > 2.24) {
      initialApiVersion += currentVersion > maxSupportedVersion ? this._getVersionDecimalPart(maxSupportedVersion) + '/' : this._getVersionDecimalPart(currentVersion)  + '/';
    }

    return initialApiVersion;
  }

  private _getVersionDecimalPart(version: number) {
    return version.toString().split('.')[1]
  }
}
