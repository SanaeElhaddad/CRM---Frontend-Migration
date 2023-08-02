import { Product } from './../../models/product';
import { ProductType } from './../../models/ProductType';
import { User } from './../../models/user';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductService extends EmsService<Product> {

  constructor(proxy: ProxyService) {
    super(proxy, 'products');
  }

}

