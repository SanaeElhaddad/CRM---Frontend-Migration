import { Product } from './product';
import { Byte } from '@angular/compiler/src/util';

export class Image {
    id: number;
    code: string;
    description: String;
    product:Product;
    bytes: Byte[];
    byDefault:boolean
    path: string;
}
