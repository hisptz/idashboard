import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  State,
  getAllSystemDataElements,
  getAllFuctionRules
} from '../../../../../store';
import { DataElement, FunctionRule } from '../../../../../models';

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

  constructor(private store: Store<State>) {
    this.dataElements$ = this.store.select(getAllSystemDataElements);
    this.functionRules$ = this.store.select(getAllFuctionRules);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
