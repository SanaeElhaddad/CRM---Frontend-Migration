import { Owner } from './owner';
import { Product } from './product';
import { Currency } from './currency';
import { Uom } from './uom';
import { ProductSupplier } from './productSupplier';
import { Alias } from './alias';

export class ProductPack {
    id: number;
    size: number;
    owner: Owner;
    alias:Alias;
    updateDate: Date;
    creationDate: Date;
    product: Product;
    uom: Uom;
    weight: number;
    height: number;
    weightControl: number;
    length: number;
    depth: number;
    typePck: number;
    quantity: number;
    salePrice: number;
    purchasePrice: number;
    width: number;
    currency: Currency;
    productSupplier: ProductSupplier[];
}
