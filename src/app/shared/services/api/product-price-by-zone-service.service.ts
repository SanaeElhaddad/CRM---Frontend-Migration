import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ProductPriceByZone } from '../../models/ProductPriceByZone';
import { EmsService } from './ems.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceByZoneServiceService extends EmsService<ProductPriceByZone>{

   private productPricebyZone:ProductPriceByZone[];
  constructor(proxy: ProxyService) {
    super(proxy, 'productPriceByZones');
  }
 setProductPriceByZone(productPricebyZone:ProductPriceByZone[]){
  this.productPricebyZone=productPricebyZone;

 }

 getProductPriceByZone( ): ProductPriceByZone[]{
  return this.productPricebyZone;

 }

}
