import { Owner } from "./Owner";
import { Product } from './product';
import { User } from './user';

export class Uom {
  uomId: number;
  uomCode: string;
  uomDescription: string;
  uomUpdateDate: Date;
  uomCreationDate: Date;
  uomProducts: Array<Product>;
  uomUser: User;
  uomOwner: Owner;
}
