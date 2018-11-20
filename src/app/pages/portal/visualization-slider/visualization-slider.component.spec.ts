import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSliderComponent } from './visualization-slider.component';

describe('VisualizationSliderComponent', () => {
  let component: VisualizationSliderComponent;
  let fixture: ComponentFixture<VisualizationSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
