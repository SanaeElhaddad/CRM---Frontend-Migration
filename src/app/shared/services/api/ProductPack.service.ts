import { supportsScrollBehavior } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { EmsService } from './ems.service';
import { ProxyService } from './proxy.service';
import { ProductPack } from '../../models/ProductPack';

@Injectable({
  providedIn: 'root'
})
export class ProductPackService extends EmsService<ProductPack> {

private productPack:ProductPack[];
constructor(proxy:ProxyService) {
  super(proxy,'productPacks');
}
getProductPack():ProductPack[]{
  return this.productPack;
}
setProductPack(productPack: ProductPack[]){
  this.productPack=productPack;
}

}
