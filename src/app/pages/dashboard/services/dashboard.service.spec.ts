import { DashboardService } from './dashboard.service';
import { TestBed } from '@angular/core/testing';

describe('DashboardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [DashboardService]
    })
  );

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
