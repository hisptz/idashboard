import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-legend-configuration',
  templateUrl: './legend-configuration.component.html',
  styleUrls: ['./legend-configuration.component.css']
})
export class LegendConfigurationComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems;

  @Output()
  legendConfigurationClose = new EventEmitter();

  color: string;
  constructor() {
    this.color = '#000000';
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
