import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-visualization-slider-resize',
  templateUrl: './visualization-slider-resize.component.html',
  styleUrls: ['./visualization-slider-resize.component.css']
})
export class VisualizationSliderResizeComponent implements OnInit {

  @Input() visualSize: string;
  @Input() title: string;
  constructor(private router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  toggleFullScreenSlider(type) {
    if ( type === 'full-screen') {
      this.router.navigate(['/pages/grouped-slider/full-screen']);
    } else {
      this.router.navigate(['/pages/grouped-slider']);
      this.closeBrowserFullscreen();
    }
  }


  closeBrowserFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
