/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FunctionMetadataService } from './function-metadata.service';

describe('Service: FunctionMetadata', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionMetadataService]
    });
  });

  it('should ...', inject([FunctionMetadataService], (service: FunctionMetadataService) => {
    expect(service).toBeTruthy();
  }));
});
