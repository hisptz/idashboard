import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';
import { Subscription, Observable, of } from 'rxjs';
import { LIST_ICON, ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from './icons';

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

  constructor() {}

  ngOnInit() {
    console.log(this.selectedItems);
  }

  ngOnDestroy() {}
}
