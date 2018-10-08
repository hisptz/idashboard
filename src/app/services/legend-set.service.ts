import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { LegendSet } from '../models/legend-set.model';
import { AppConfigurationsService } from './app-configurations.service';

@Injectable({ providedIn: 'root' })
export class LegendSetService {
  constructor(
    private http: NgxDhis2HttpClientService,
    private appConfigurationService: AppConfigurationsService
  ) {}

  // @todo update url to data store
  getLegendSets(): Observable<LegendSet[]> {
    const legendUrl = `dataStore/legendSets/configuration`;
    return new Observable(observer => {
      this.http.get(legendUrl).subscribe(
        (response: any) => {
          const legendSets = response.legendSets || [];
          observer.next(legendSets);
          observer.complete();
        },
        () => {
          this.appConfigurationService
            .getDefaultLegends()
            .subscribe(legendSets => {
              observer.next(legendSets);
              observer.complete();
            });
        }
      );
    });
  }

  updateLegendSets(legendSets: LegendSet[]): Observable<any> {
    const legendUrl = `dataStore/legendSets/configuration`;
    const filteredLegendSets = _.filter(
      legendSets,
      (legendSet: LegendSet) => legendSet.legends.length > 0
    );
    return this.http.put(legendUrl, { legendSets: filteredLegendSets });
  }
}
