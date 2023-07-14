import {Organisation} from './Organisation';
import {Address} from './Address';


export class Owner {
  id: number;
  comment: string;
  code: string;
  updateDate: Date;
  variable1: string;
  variable2: string;
  variable3: string;
  variable4: string;
  variable5: string;
  variable6: string;
  variable7: string;
  variable8: string;
  variable9: string;
  variable10: string;
  siret: string;
  active: boolean;
  creationDate: Date;
  description: string;
  address: Address;
  name: string;
  surname: string;
  email: string;
  primaryTel: string;
  secondaryTel: string;
  invoiceType: number;
  invoiceTerm: string;
  relevantVat: boolean;
  vat: number;
  organisation: Organisation;
  currency: string;
  firstInvoiceDate: Date;
  image: string;


}
