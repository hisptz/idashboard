import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { LegendSet } from './models/legend-set';

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
  ngOnInit() {}

  onLegendSetCOnfigurationClose(legendSets: LegendSet[]) {
    console.log(JSON.stringify(legendSets));
  }

  ngOnDestroy() {}
}
