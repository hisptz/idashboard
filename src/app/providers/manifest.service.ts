import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class ManifestService {

  constructor(private http: Http) { }

  getRootUrl(): Observable<string> {
    return this.http.get('manifest.webapp').map(res => res.json()).map((manifect: any) => { return manifect.activities.dhis.href}).catch(error => Observable.throw(new Error(error)));
  }
}
