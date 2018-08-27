import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { DataElement } from '../model/data-element';

@Injectable({
  providedIn: 'root'
})
export class DataElementsService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getDataElements(): Observable<DataElement[]> {
    return this.http
      .get(
        'dataElements.json?fields=,id,name,categoryCombo&paging=false&filter=' +
          'domainType:eq:AGGREGATE&filter=valueType:ne:TEXT&filter=valueType:ne:LONG_TEXT'
      )
      .pipe(map((res: any) => res.dataElements || []));
  }
}
