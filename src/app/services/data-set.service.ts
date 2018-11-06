import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { DataSet } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getDataSets(): Observable<DataSet[]> {
    return this.http
      .get('dataSets.json?fields=id,name&paging=false')
      .pipe(map((res: any) => res.dataSets || []));
  }
}

// _.flattenDeep(
//   _.map(res.dataSets, dataSet => {
//     return [
//       {
//         id: `${dataSet.id}.ACTUAL_REPORTS`,
//         name: `${dataSet.name} [Actual reports]`
//       },
//       {
//         id: `${dataSet.id}`,
//         name: `${dataSet.name}`
//       }
//     ];
//   })
// );
