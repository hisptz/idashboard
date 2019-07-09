import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuListComponent } from './dashboard-menu-list.component';

describe('DashboardMenuListComponent', () => {
  let component: DashboardMenuListComponent;
  let fixture: ComponentFixture<DashboardMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
