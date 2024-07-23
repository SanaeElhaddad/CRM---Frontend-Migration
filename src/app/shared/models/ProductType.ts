import { Owner } from './Owner';
import { Vat } from './Vat';
import { Image } from './Image';
import { Byte } from '@angular/compiler/src/util';
export class ProductType {


  id!: number;
  code!: string;
  updateDate!: Date;
  creationDate!: Date;
  description!: string;
  owner!: Owner;
  productType!: ProductType;
  vat!: Vat;
  image:Byte[];


}
