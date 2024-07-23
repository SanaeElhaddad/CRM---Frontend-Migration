import { Owner } from './owner';
import { Product } from './product';
import { Uom } from './uom';

export class Alias {
    id: number;
    name: string;
    updateDate: Date;
    creationDate: Date;
    product: Product;
    uom: Uom;
    eanCode: String;
}
