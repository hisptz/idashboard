import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { camelCase } from 'lodash';
import { standardizeDashboardItem } from '../helpers/standardize-dashboard-item.helper';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardItemService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getOne(dashboardItemId: string, dashboardItemType: string) {
    return this.http
      .get(
        `dashboardItems/${dashboardItemId}.json?fields=id,type,height,width,x,y,interpretationCount,favorite,access,${camelCase(
          dashboardItemType
        )}[id,name]`
      )
      .pipe(
        map((dashboardItem: any) => standardizeDashboardItem(dashboardItem))
      );
  }
}
