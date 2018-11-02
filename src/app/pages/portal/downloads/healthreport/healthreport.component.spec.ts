import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthreportComponent } from './healthreport.component';

describe('HealthreportComponent', () => {
  let component: HealthreportComponent;
  let fixture: ComponentFixture<HealthreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
