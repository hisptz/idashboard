import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedSliderComponent } from './grouped-slider.component';

describe('GroupedSliderComponent', () => {
  let component: GroupedSliderComponent;
  let fixture: ComponentFixture<GroupedSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
