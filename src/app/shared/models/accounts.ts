import { Lead } from './Lead';
import { ActivityArea } from "./ActivityArea";
import { Address } from "./Address";
import { ClientCategory } from "./ClientCategory";
import { Owner } from "./Owner";
import { StatusAccount } from "./StatusAccount";
import { TypeAccount } from "./TypeAccount";
import { Contact } from "./contact";
import { User } from "./user";

export class Account {
  accountId: number;
  accountCode: string;
  accountName: string;
  accountCreateDate: Date;
  accountUpdateDate: Date;
  accountActive: boolean;
  accountDescription: string;
  accountContacts: Contact[];
  accountAddress: Address;
  //accountCompany: Company;
  accountActivityArea: ActivityArea;
  accountTurnover: number;
  accountThreshold: number;
  accountBilledAmount: number;
  accountPayedAmount: number;
  accountCredit: number;
  accountComment: string;
  accountStatusAccount: StatusAccount;
  accountLeads: Lead[];
  user: User;
  //accountSaleOrders: SaleOrder[];
  //accountBankData: BankData;
  //accountCurrency: Currency;
  //accountMaintenanceContracts: MaintenanceContract[];
  //commercial: Commercial;
  accountNotification: boolean;
  accountType: TypeAccount;
  accountMaxCredit: number;
  owner: Owner;
  paymentTerm: PaymentItem;
  //tourPlan: TourPlan;
  clientCategory: ClientCategory;
  //supplier: Supplier;
  //zone: Zone;
  accountEmail: string;
  accountHasDistributor: boolean;
  //distributor: Distributor;
  agentPartner: boolean;
  partner: boolean;
  accountPartner: Account;

  constructor() {
    this.accountContacts = [];
    //this.accountLeads = [];
    //this.accountSaleOrders = [];
    //this.accountMaintenanceContracts = [];
  }
}

// You'll need to create TypeScript models for other referenced classes like Contact, Address, Company, etc.
// Assuming you have already defined those classes, you should include them in the TypeScript code as well.
