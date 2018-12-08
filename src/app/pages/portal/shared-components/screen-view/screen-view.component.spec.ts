import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenViewComponent } from './screen-view.component';

describe('ScreenViewComponent', () => {
  let component: ScreenViewComponent;
  let fixture: ComponentFixture<ScreenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
