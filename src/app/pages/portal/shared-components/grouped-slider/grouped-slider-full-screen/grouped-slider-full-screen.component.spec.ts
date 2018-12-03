import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedSliderFullScreenComponent } from './grouped-slider-full-screen.component';

describe('GroupedSliderFullScreenComponent', () => {
  let component: GroupedSliderFullScreenComponent;
  let fixture: ComponentFixture<GroupedSliderFullScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedSliderFullScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedSliderFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
