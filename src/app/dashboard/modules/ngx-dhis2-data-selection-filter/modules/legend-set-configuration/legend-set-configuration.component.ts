import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { LegendSet } from './models/legend-set';
import { Store, select } from '@ngrx/store';
import {
  State,
  getLegendSetsEntities,
  getAllFunctionRules
} from '../../../../../store';
import { Observable } from 'rxjs';
import { UpsetLagendSets } from '../../../../../store/actions/legend-set.action';
import { FunctionRule } from 'src/app/models';

@Component({
  selector: 'app-legend-set-configuration',
  templateUrl: './legend-set-configuration.component.html',
  styleUrls: ['./legend-set-configuration.component.css']
})
export class LegendSetConfigurationComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems;
  @Input()
  visualizationLayerId: string;
  functionRules$: Observable<FunctionRule[]>;

  @Output()
  legendSetConfigurationClose = new EventEmitter();
  legendSetEntities$: Observable<any>;

  constructor(private store: Store<State>) {
    this.legendSetEntities$ = this.store.pipe(select(getLegendSetsEntities));
    this.functionRules$ = this.store.select(getAllFunctionRules);
  }

  ngOnInit() {}

  onLegendSetConfigurationSave(legendSets: LegendSet[]) {
    this.store.dispatch(new UpsetLagendSets({ legendSets }));
    this.legendSetConfigurationClose.emit({
      items: this.selectedItems,
      groups: [],
      dimension: 'dx'
    });
  }

  onLegendSetConfigurationClose() {
    this.legendSetConfigurationClose.emit({
      items: this.selectedItems,
      groups: [],
      dimension: 'dx'
    });
  }

  ngOnDestroy() {}
}
