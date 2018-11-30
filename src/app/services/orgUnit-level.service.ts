import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrgUnitLevel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrgUnitLevelService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getOrgUnitLevel(): Observable<OrgUnitLevel[]> {
    return this.httpClient
      .get('organisationUnitLevels.json?fields=id,name,level&paging=false&order=level:asc')
      .pipe(
        map((response: any) => (response && response.organisationUnitLevels ? response.organisationUnitLevels : []))
      );
  }
}
