import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

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
  ngOnDestroy() {}
}
