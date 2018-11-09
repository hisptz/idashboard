import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { LegendSet, Legend } from '../models/legend-set.model';
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
          observer.next(this.getSanitizedLegendSets(legendSets));
          observer.complete();
        },
        () => {
          this.appConfigurationService
            .getDefaultLegends()
            .subscribe(legendSets => {
              observer.next(this.getSanitizedLegendSets(legendSets));
              observer.complete();
            });
        }
      );
    });
  }

  getSanitizedLegendSets(legendSets: LegendSet[]) {
    legendSets.forEach((legendSet: LegendSet) => {
      legendSet.legends.forEach((legend: Legend) => {
        legend.startValue = !legend.startValue
          ? Number.NEGATIVE_INFINITY
          : legend.startValue;
        legend.endValue = !legend.endValue
          ? Number.POSITIVE_INFINITY
          : legend.endValue;
      });
    });
    console.log(legendSets);
    return legendSets;
  }

  updateLegendSets(legendSets: LegendSet[]): Observable<any> {
    const legendUrl = `dataStore/legendSets/configuration`;
    const filteredLegendSets = _.filter(
      legendSets,
      (legendSet: LegendSet) => legendSet.legends.length > 0
    );
    console.log(filteredLegendSets);
    return this.http.put(legendUrl, { legendSets });
  }
}
