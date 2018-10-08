import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import * as fromDynamicDimension from '../../store/reducers/dynamic-dimension.reducer';
import { Store } from '@ngrx/store';
import { LoadDynamicDimensionsAction } from '../../store/actions/dynamic-dimension.actions';
import { Observable, of } from 'rxjs';
import { DynamicDimension } from '../../store/models/dynamic-dimension.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-dhis2-dynamic-dimension',
  templateUrl: './ngx-dhis2-dynamic-dimension.component.html',
  styleUrls: ['./ngx-dhis2-dynamic-dimension.component.scss']
})
export class NgxDhis2DynamicDimensionComponent implements OnInit {
  @Input()
  selectedDimensions: any[];
  dynamicDimensions$: Observable<DynamicDimension[]>;

  private _activeDimension: any;
  get activeDimension$(): Observable<any> {
    if (!this._activeDimension) {
      const firstSelectedDimension = this.selectedDimensions
        ? this.selectedDimensions[0]
        : null;
      return this.dynamicDimensions$.pipe(
        map((dynamicDimensions: DynamicDimension[]) => {
          return (
            _.find(
              dynamicDimensions,
              firstSelectedDimension ? firstSelectedDimension.id : ''
            ) || dynamicDimensions[0]
          );
        })
      );
    }
    return of(this._activeDimension);
  }

  constructor(
    private dynamicDimensionStore: Store<fromDynamicDimension.State>
  ) {
    this.dynamicDimensionStore.dispatch(new LoadDynamicDimensionsAction());

    // select dynamic dimension prorperties
    this.dynamicDimensions$ = this.dynamicDimensionStore.select(
      fromDynamicDimension.getDynamicDimensions
    );
  }

  ngOnInit() {}

  onSetActiveDynamicDimension(dynamicDimension: DynamicDimension) {
    this._activeDimension = dynamicDimension;
  }
}
