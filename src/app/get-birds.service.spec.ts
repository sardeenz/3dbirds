import { TestBed, inject } from '@angular/core/testing';

import { GetBirdsService } from './get-birds.service';

describe('GetBirdsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBirdsService]
    });
  });

  it('should be created', inject([GetBirdsService], (service: GetBirdsService) => {
    expect(service).toBeTruthy();
  }));
});
