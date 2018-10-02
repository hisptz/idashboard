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
import { State, getLegendSetsEntities } from '../../../../../store';
import { Observable } from 'rxjs';
import * as legendSetHelper from './helpers/legend-set-helper';
import { UpsetLagendSets } from '../../../../../store/actions/legend-set.action';

@Component({
  selector: 'app-legend-set-configuration',
  templateUrl: './legend-set-configuration.component.html',
  styleUrls: ['./legend-set-configuration.component.css']
})
export class LegendSetConfigurationComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems;

  @Output()
  legendSetConfigurationClose = new EventEmitter();
  legendSetEntities$: Observable<any>;

  constructor(private store: Store<State>) {
    this.legendSetEntities$ = this.store.pipe(select(getLegendSetsEntities));
  }

  ngOnInit() {}

  onLegendSetConfigurationSave(legendSets: LegendSet[]) {
    legendSets = legendSetHelper.getLegendSetForUpdate(legendSets);
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
