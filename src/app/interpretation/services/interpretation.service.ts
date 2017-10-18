import { Injectable } from '@angular/core';
import {HttpClientService} from '../../providers/http-client.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InterpretationService {

  constructor(private httpClient: HttpClientService) { }

  create(interpretationData: any, rootUrl: any) {
    return new Observable(observer => {
      const url = rootUrl + '/interpretations/' + interpretationData.type + '/' + interpretationData.id;
      this.httpClient.post(url, interpretationData.message).subscribe(() => {
        const interpretationUrl = rootUrl + interpretationData.type + 's/' + interpretationData.id +
          '?fields=interpretations[id,type,text,lastUpdated,href,created,likes,likedBy[id,name,displayName],user[id,name,displayName],comments[id,created,text,user[id,name]],' +
          interpretationData.type + '[id,name]]';
        this.httpClient.get(interpretationUrl)
          .subscribe((interpretationResponse: any) => {
            observer.next(interpretationResponse.interpretations);
            observer.complete();
          }, interpretationError => observer.error(interpretationError));
      }, error => observer.error(error));
    })
  }

}
