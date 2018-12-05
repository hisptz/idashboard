import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from '../../../../services/http-client.service';
import {AppState} from '../../../../store/app.reducers';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {

  @Input() dataDimensions: any;
  dataValue: any;
  constructor(private httpClient: HttpClientService) {
  }

  ngOnInit() {
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
