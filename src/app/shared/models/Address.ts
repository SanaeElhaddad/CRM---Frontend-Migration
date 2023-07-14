import { Owner } from './owner';

export class Address {
    adrId: number;
    adrCode: string;
    adrLine1: string;
    adrLine2: string;
    adrCity: string;
    adrDigicode: string;
    adrCountry: string;
    adrZip: string;
    adrState: string;
    adrCreationDate: Date;
    adrUpdateDate: Date;
    adrLatitude: number;
    adrLongitude: number;
    owner: Owner;
}
