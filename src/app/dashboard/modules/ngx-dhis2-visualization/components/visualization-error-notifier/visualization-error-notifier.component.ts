import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'visualization-error-notifier',
  templateUrl: './visualization-error-notifier.component.html',
  styleUrls: ['./visualization-error-notifier.component.css']
})
export class VisualizationErrorNotifierComponent implements OnInit {
  @Input() errorMessage: any;
  isServerError: boolean;
  constructor() {}

  ngOnInit() {
    const { message } = this.errorMessage;
    this.isServerError = message.indexOf('have not been mapped') === -1;
  }
}
