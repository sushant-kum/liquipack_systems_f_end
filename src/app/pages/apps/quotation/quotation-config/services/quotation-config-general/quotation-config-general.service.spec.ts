import { TestBed } from '@angular/core/testing';

import { QuotationConfigGeneralService } from './quotation-config-general.service';

describe('QuotationConfigGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationConfigGeneralService = TestBed.get(QuotationConfigGeneralService);
    expect(service).toBeTruthy();
  });
});
