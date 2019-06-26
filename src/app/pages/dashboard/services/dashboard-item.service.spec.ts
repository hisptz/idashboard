import { DashboardItemService } from './dashboard-item.service';
import { TestBed } from '@angular/core/testing';

describe('DashboardItemService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [DashboardItemService]
    })
  );

  it('should be created', () => {
    const service: DashboardItemService = TestBed.get(DashboardItemService);
    expect(service).toBeTruthy();
  });
});
