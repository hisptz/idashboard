import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollingComponent } from './horizontal-scrolling.component';

describe('HorizontalScrollingComponent', () => {
  let component: HorizontalScrollingComponent;
  let fixture: ComponentFixture<HorizontalScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalScrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
