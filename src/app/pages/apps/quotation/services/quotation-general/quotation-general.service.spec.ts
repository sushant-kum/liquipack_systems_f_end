import { TestBed } from '@angular/core/testing';

import { QuotationGeneralService } from './quotation-general.service';

describe('QuotationGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationGeneralService = TestBed.get(
      QuotationGeneralService
    );
    expect(service).toBeTruthy();
  });
});
