import { Owner } from "./Owner";
import { Devis } from "./Devis";
import { User } from "./user";
import { Lead } from "./Lead";
import { Account } from "./accounts";

export class Commercial {
  id: number;
  code: string;
  profitPercentage: number;
  active: boolean;
  creationDate: Date;
  updateDate: Date;
  // agency: Agency;
  responsable: string;
  parent: Commercial;
  // commissions: Commission[];
  childrens: Commercial[];
  accounts: Account[];
  leads: Lead[];
  // companies: Company[];
  // zone: Zone;
  user: User;
  devis: Devis[];
  // saleOrders:SaleOrder[];
  owner: Owner;
  // warehouse: Warehouse;
  fullName: string;
}
