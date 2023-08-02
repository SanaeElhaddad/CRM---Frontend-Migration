import { TestBed } from '@angular/core/testing';

import { ProductPriceByZoneServiceService } from './product-price-by-zone-service.service';

describe('ProductPriceByZoneServiceService', () => {
  let service: ProductPriceByZoneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPriceByZoneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
