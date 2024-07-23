import { Product } from './../../models/product';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { Subject } from 'rxjs';


@Injectable()
export class ProductService extends EmsService<Product> {

  selectedProduct: Product = new Product();
  

  private product = new Subject<Product>();

  constructor(proxy: ProxyService) {
    super(proxy, 'products');
  }




  setProduct(product: Product){
    this.product.next(product);
    this.selectedProduct = product;
  }

  getProduct(): Product {
    return this.selectedProduct;
  }

}

