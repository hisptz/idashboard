import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visualization-slider-resize',
  templateUrl: './visualization-slider-resize.component.html',
  styleUrls: ['./visualization-slider-resize.component.css']
})
export class VisualizationSliderResizeComponent implements OnInit {

  @Input() visualSize: string;
  @Input() title: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleFullScreenSlider(type) {
    if ( type === 'full-screen') {
      this.router.navigate(['/pages/visualization-slider/full-screen']);
    } else {
      this.router.navigate(['/pages/home']);
    }
  }
}
