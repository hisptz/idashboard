import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSliderFullScreenComponent } from './visualization-slider-full-screen.component';

describe('VisualizationSliderFullScreenComponent', () => {
  let component: VisualizationSliderFullScreenComponent;
  let fixture: ComponentFixture<VisualizationSliderFullScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationSliderFullScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationSliderFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
