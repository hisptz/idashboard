/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataElementsService } from './dataElements.service';

describe('Service: DataElements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataElementsService]
    });
  });

  it('should ...', inject([DataElementsService], (service: DataElementsService) => {
    expect(service).toBeTruthy();
  }));
});
