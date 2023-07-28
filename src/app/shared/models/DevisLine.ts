import { Commercial } from "./Commercial";
import { Uom } from "./uom";
import { Devis } from "./Devis";
import { Owner } from "./Owner";
import { OrderStatus } from "./OrderStatus";

export class DevisLine {
  id: number;
  devis: Devis;
  owner: Owner;
  //  product: Product;
  uom: Uom;
  // color: Color;
  orderStatus: OrderStatus;
  lineNumber: number;
  quantity: number;
  salePrice: number;
  discount: number;
  productDescription: string;
  creationDate: Date;
  updateDate: Date;
  comment: string;
  // vat: Vat;
  totalPriceHT: number;
  totalPriceTTC: number;
  // productDimension: ProductDimension;
  commercial: Commercial;
  //  productPack: ProductPack;
  totalVat: number;
}
