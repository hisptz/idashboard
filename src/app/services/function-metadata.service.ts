import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { AppConfigurationsService } from './app-configurations.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionMetadataService {
  constructor(
    private http: NgxDhis2HttpClientService,
    private appConfigurationService: AppConfigurationsService
  ) {}

  loadingFunction(): Observable<any> {
    const url = 'dataStore/functions/whoMalariafn';
    return new Observable(observer => {
      this.http.get(url).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        () => {
          this.appConfigurationService.getDefaultFunction().subscribe(
            response => {
              observer.next(response);
              observer.complete();
            },
            () => {
              observer.error();
            }
          );
        }
      );
    });
  }

  updateFunctionRuleDataStore(data): Observable<any> {
    return new Observable(observer => {
      const { rules } = data;
      // @todo make generatic for other use case
      const url = 'dataStore/functions/whoMalariafn';
      this.http.get(url).subscribe(
        (response: any) => {
          response['rules'] = rules;
          this.http.put(url, response).subscribe(
            res => {
              observer.next();
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}
