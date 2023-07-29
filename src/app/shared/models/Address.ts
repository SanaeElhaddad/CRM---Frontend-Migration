import { Owner } from "./Owner";

export class Address {
  adrId: number;
  adrCode: string;
  adrLine1: string;
  adrLine2: string;
  adrZip: string;
  adrDigiCode: string;
  adrCity: string;
  adrState: string;
  adrCountry: string;
  adrCreationDate: Date;
  adrUpdateDate: Date;

  adrOwner: Owner;
}
