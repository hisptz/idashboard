import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class FunctionMetadataService {
  constructor(private http: NgxDhis2HttpClientService) {}

  loadinFuctionRules(): Observable<any> {
    const url = 'dataStore/functions/whoMalariafn';
    return this.http.get(url).pipe(map((res: any) => res.rules || []));
  }

  updateFucntionRuleDataStore(data): Observable<any> {
    return new Observable(observer => {
      const { rules } = data;
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
