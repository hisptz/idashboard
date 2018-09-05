import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { Geofeature } from '../../models';
const DEFAULT_DISPLAY_PROPERTY = 'SHORTNAME';

@Injectable({
  providedIn: 'root'
})
export class GeofeatureService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getGeofeature(ouValue: string, displayProperty: string = DEFAULT_DISPLAY_PROPERTY): Observable<Array<Geofeature>> {
    return ouValue && ouValue.length
      ? this.http.get(`geoFeatures?ou=ou:${ouValue}&displayProperty=${displayProperty}`)
      : of(null);
  }
}
