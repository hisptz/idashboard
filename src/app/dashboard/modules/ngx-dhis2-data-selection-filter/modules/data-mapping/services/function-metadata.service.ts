import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class FunctionMetadataService {
  constructor(private http: NgxDhis2HttpClientService) {}

  loadinFuction(): Observable<any> {
    const url = 'dataStore/functions/whoMalariafn';
    return this.http.get(url);
  }
}
