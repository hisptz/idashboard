import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClientService {
  public APIURL = 'https://hmisportal.moh.go.tz/dhis/';
  settings: any = null;

  constructor(private http: Http) {

  }

  createAuthorizationHeader(settings: any) {
    const username = settings.username;
    const password = settings.password;

    const token = btoa(username + ':' + password);

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + token);

    return headers;
  }

  getSettings() {
    return new Observable(observer => {
      if (!this.settings) {
        this.http.get('manifest.webapp').map(res => res.json())
          .subscribe((settings: any) => {

            this.settings = {...settings.activities.dhis};
            observer.next(settings.activities.dhis);
            observer.complete();
          })
      } else {
        observer.next(this.settings);
        observer.complete();
      }
    })
  }

  get(url): Observable<any> {
    return new Observable(observer => {
      this.getSettings().subscribe((settings: any) => {
        const headers: Headers = this.createAuthorizationHeader(settings);
        this.http.get(url, {
          headers: headers
        })
          .map(this.responseHandler())
          .catch(this.handleError)
          .subscribe((data: any) => {
            observer.next(data);
            observer.complete();
          }, error => observer.error(error));
      })
    })
  }

  get1(url) {
    //
    // return this.http.get(this.APIURL + url, {
    //   headers: headers
    // }).map(this.responseHandler()).catch(this.handleError);
  }

  post(url, data, options?) {
    return this.http.post(url, data)
      .map(this.responseHandler())
      .catch(this.handleError);
  }

  put(url, data, options?) {
    return this.http.put(url, data).map(this.responseHandler());
  }

  delete(url, options?) {
    return this.http.delete(url)
      .map(this.responseHandler())
      .catch(this.handleError);
  }

  responseHandler() {
    return (res) => {
      try {
        return res.json();
      } catch (e) {
        return null;
      }
    }
  }

  handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = error.toString();
    } else {
      const newErrorObject: any = Object.assign({}, error);
      let sanitizedError = newErrorObject.message ? newErrorObject.message : newErrorObject._body ? newErrorObject._body : newErrorObject.toString();
      try {
        sanitizedError = (new Function('return ' + sanitizedError))();
        errMsg = sanitizedError.message;
      } catch (e) {
        errMsg = sanitizedError
      }
    }
    return Observable.throw(errMsg);
  }
}
