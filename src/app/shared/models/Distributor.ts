import { Commercial } from './Commercial';
import { Owner } from './Owner';
import { User } from './user';
import { ClientCategory } from './ClientCategory';
import { Account } from './accounts';
export class Distributor  {

    id: number;
    code: string;
    lastName: string;
    firstName: string;
    email: string;
    mobile: string;
    active: boolean;
    creationDate: Date;
    updateDate: Date ;
    account: Account;
    clientCategory: ClientCategory;
    user: User;
    owner: Owner;
    password: string;
    commercial: Commercial;
    hasAuthentification: boolean;

}
