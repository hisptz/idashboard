import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  State,
  getAllSystemDataElements,
  getAllFunctionRules,
  UpdateFunctionRules,
  getAllIndicators,
  getCurrentDataFilterItems,
  SetCurrentDataItemMapingGroup,
  getCurrentDataItemMappingGroup
} from '../../../../../store';
import { DataElement, FunctionRule } from '../../../../../models';
import { Indicator } from '../data-filter/model/indicator';

@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.css']
})
export class DataMappingComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems;

  @Output()
  dataFilterUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  dataFilterClose: EventEmitter<any> = new EventEmitter<any>();

  dataElements$: Observable<DataElement[]>;
  functionRules$: Observable<FunctionRule[]>;
  indicators$: Observable<Indicator[]>;
  selectedGroup$: Observable<any>;
  dataFilterItems$: Observable<any[]>;

  constructor(private store: Store<State>) {
    this.selectedGroup$ = this.store.pipe(
      select(getCurrentDataItemMappingGroup)
    );
    this.functionRules$ = this.store.select(getAllFunctionRules);
    this.dataFilterItems$ = this.store.pipe(select(getCurrentDataFilterItems));
    this.dataElements$ = this.store.select(getAllSystemDataElements);

    this.indicators$ = this.store.pipe(select(getAllIndicators));
  }

  ngOnInit() {}

  onDataMappingClose(data) {
    const { rules } = data;
    this.store.dispatch(new UpdateFunctionRules({ rules }));
    this.dataFilterUpdate.emit({
      items: this.selectedItems,
      groups: [],
      dimension: 'dx'
    });
  }

  onSelectDataMappingGroup(group) {
    this.store.dispatch(new SetCurrentDataItemMapingGroup(group));
  }

  ngOnDestroy() {
    this.functionRules$ = null;
    this.dataElements$ = null;
  }
}
