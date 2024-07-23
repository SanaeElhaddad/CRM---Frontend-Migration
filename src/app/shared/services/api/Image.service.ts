import { Injectable } from '@angular/core';
import { EmsService } from './ems.service';
import { Image } from '../../models/Image';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends EmsService<Image> {

  private productImage:Image[];
 constructor(proxy: ProxyService) {
    super(proxy, "images");
  }
  setImage(productImage:Image[]){
    this.productImage=productImage;
  }
  getImage():Image[]{
    return this.productImage;
  }
}
