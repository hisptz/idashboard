import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-indicator-naming',
  templateUrl: './indicator-naming.component.html',
  styleUrls: ['./indicator-naming.component.css']
})
export class IndicatorNamingComponent implements OnInit {
  @Input() indicator: any;
  @Output() updateIndicator = new EventEmitter();

  indicatorLabel: string;

  constructor() {}

  ngOnInit() {
    const { name } = this.indicator;
    this.indicatorLabel = name;
  }

  onUpdateIndicatorName() {
    const { name } = this.indicator;
    if (name !== '' && name !== this.indicatorLabel) {
      this.updateIndicator.emit({ indicator: this.indicator });
    }
  }
}
