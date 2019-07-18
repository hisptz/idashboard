import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModeComponent } from './dashboard-mode.component';

describe('DashboardModeComponent', () => {
  let component: DashboardModeComponent;
  let fixture: ComponentFixture<DashboardModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
