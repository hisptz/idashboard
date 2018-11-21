import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from '../../../../services/http-client.service';
import {Observable} from 'rxjs/Observable';
import {DataState} from '../../../../store/portal/portal.state';
import {AppState} from '../../../../store/app.reducers';
import {select, Store} from '@ngrx/store';
import * as portalActions from '../../../../store/portal/portal.actions';
import {getAnalyticsData} from '../../../../store/portal/portal.selectors';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {

  @Input() dataDimensions: any;
  analyticsData$: Observable<DataState>;
  dataValue: any;
  constructor(private httpClient: HttpClientService, private store: Store<AppState>) {
  }

  ngOnInit() {
    if (this.dataDimensions) {
      this.store.dispatch(new portalActions.LoadDataAction(this.dataDimensions));
      this.analyticsData$ = this.store.select(getAnalyticsData);
      if (this.analyticsData$) {
        this.analyticsData$.subscribe((analyticsData) => {
          if (analyticsData) {
            console.log('store based analytics', analyticsData);
            analyticsData.rows.forEach((row) => {
              this.dataValue = parseFloat(row[2]);
            });
          }
        });
      }
    }
    const ou = this.dataDimensions['orgUnitId'];
    const indicator = this.dataDimensions['indicatorId'];
    const pe = this.dataDimensions['period'];
    const url = '../api/analytics.json?dimension=dx:' + indicator + '&dimension=pe:' + pe + '&filter=ou:' + ou + '&displayProperty=NAME&skipMeta=false';
    this.httpClient.get(url).subscribe((data) => {
      if (data) {
        data.rows.forEach((row) => {
          this.dataValue = parseFloat(row[2]).toFixed(2);
        });
      }
    });
  }

}
