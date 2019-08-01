import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the VisualizationFooterSectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'visualization-footer-section',
  templateUrl: 'visualization-footer-section.html',
  styleUrls: ['./visualization-footer-section.css']
})
export class VisualizationFooterSectionComponent {
  @Input()
  visualizationType: string;
  @Input()
  name: string;
  @Input()
  description: string;
  @Input()
  hideTypeButtons: boolean;
  @Input()
  hideManagementBlock: boolean;

  @Input()
  hideDownloadBlock: boolean;

  @Output()
  visualizationTypeChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  saveVisualization: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeVisualization: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  download: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.hideManagementBlock = this.hideTypeButtons = true;
  }

  onVisualizationTypeChange(visualizationType: string) {
    this.visualizationTypeChange.emit(visualizationType);
  }

  onVisualizationSave(visualizationDetails: any) {
    this.saveVisualization.emit(visualizationDetails);
  }

  onVisualizationRemove(details: any) {
    this.removeVisualization.emit(details);
  }

  onDownload(downloadFormat: string) {
    this.download.emit({
      visualizationType: this.visualizationType,
      downloadFormat: downloadFormat
    });
  }
}
