import { ProductType } from './../../models/product-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ProductTypeService  extends EmsService<ProductType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'producttypes');
  }

}
