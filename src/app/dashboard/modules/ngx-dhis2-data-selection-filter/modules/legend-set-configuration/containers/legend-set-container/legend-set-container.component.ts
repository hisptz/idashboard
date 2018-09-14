import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-legend-set-container',
  templateUrl: './legend-set-container.component.html',
  styleUrls: ['./legend-set-container.component.css']
})
export class LegendSetContainerComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems;

  @Output()
  legendSetConfigurationClose = new EventEmitter();

  color: string;
  constructor() {
    this.color = '#000000';
  }

  ngOnInit() {
    console.log(this.selectedItems);
  }

  ngOnDestroy() {}
}
