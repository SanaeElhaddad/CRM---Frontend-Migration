import { Owner } from './owner';
import { Zone } from './zone';
import { Product } from './product';

export class ProductPriceByZone {
    id: number;
    zone: Zone;
    product: Product;
    creationDate: Date;
    updateDate: Date;
    retailPrice: number;
    wholeSalePrice: number;
    semiWholeSalePrice:number;

}
