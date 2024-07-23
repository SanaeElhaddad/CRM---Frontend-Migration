//import {CashRegister} from './cash-register';
import {Currency} from './currency';
import {OrderType} from './order-type';
import {Address} from './address';
import {Owner} from './owner';
import {Supplier} from './supplier';
import { OrderStatus } from './OrderStatus';
import { Account } from './accounts';

export class Reception {

    id: number;
    owner: Owner;
    code: string;
    address: Address;
    creationDate: Date;
    updateDate: Date;
    description: string;
    supplier: Supplier;
    //purshaseOrder: PurchaseOrder;
    orderType: OrderType;
    remarks: string;
    orderCode: string;
    orderStatus: OrderStatus;
    //warehouse: Warehouse;
    account: Account;
    discount = 0;
    totalPriceHT = 0;
    totalPriceTTC = 0;
    currency: Currency;
    vat= 0;
    active: boolean;
    accounted: boolean;
    //receptionLines: ReceptionLine[] = [];
    receptionDate: Date=new Date();
   // box: CashRegister;
    supplierDeliveryDate: Date;
}
