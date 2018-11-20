import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSliderResizeComponent } from './visualization-slider-resize.component';

describe('VisualizationSliderResizeComponent', () => {
  let component: VisualizationSliderResizeComponent;
  let fixture: ComponentFixture<VisualizationSliderResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationSliderResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationSliderResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
