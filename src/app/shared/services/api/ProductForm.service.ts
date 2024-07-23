import { Injectable } from '@angular/core';
import { EmsService } from './ems.service';
import { ProductForm } from '../../models/ProductForm';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService extends EmsService<ProductForm> {

  constructor(proxy: ProxyService) {
    super(proxy, 'productForms');
  }

}
