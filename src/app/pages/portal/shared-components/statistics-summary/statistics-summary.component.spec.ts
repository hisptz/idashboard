import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSummaryComponent } from './statistics-summary.component';

describe('StatisticsSummaryComponent', () => {
  let component: StatisticsSummaryComponent;
  let fixture: ComponentFixture<StatisticsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
