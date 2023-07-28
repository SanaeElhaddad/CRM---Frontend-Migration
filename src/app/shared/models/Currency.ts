import { User } from "./user";

export class Currency {
  currencyId: number;
  currencyCode: string;
  currencyDescription: string;
  currencyCreationDate: Date;
  currencyUpdateDate: Date;
  currencyUser: User;
  currencyDefault: boolean;
  currencyPurchaseValue: number;
  currencySaleValue: number;
  currencySymbol: string;
}
