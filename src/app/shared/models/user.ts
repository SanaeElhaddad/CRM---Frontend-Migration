
import { Owner } from './owner';
import {UserGroup} from './user-group';


export class User {
    id: number;
    code: string;
    password: string;
    name: string;
    surName: string;
    dateOfBirth: Date;
    tel: string;
    passportNumber: string;
    comment: string;
    email: string;
    isActive: boolean;
    isResponsible: boolean;
    owner: Owner;
    type: number;
    // agency: Agency;
    columns: string;
    // saleOrders: SaleOrder[];
    userGroup: UserGroup;
}
