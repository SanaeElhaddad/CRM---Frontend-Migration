import {Objective} from './Objective';


export class Organisation {


  id: number;
  code: string;
  nomOrganisation: string;
  telephonePrincipalOrganisation: string;
  fax: string;
  logo: string;
  siret: string;
  classificationFiscale: string;
  description: string;
  nomContactPrincipal: string;
  prenomContactPrincipal: string;
  emailContactPrincipal: string;
  telephoneContactPrincipal: string;
  nomContactLogistique: string;
  prenomContactLogistique: string;
  emailContactLogistique: string;
  telephoneContactLogistique: string;
  comment: string;
  addressType: number;
  firstAddressLine: string;
  secondAddressLine: string;
  zipCode: string;
  city: string;
  country: string;
  nomAdressSiegePrincipal: string;
  gestionConteneurs: boolean;
  webSite: string;
  generaleCondition: string;
  image: string;
  creationDate: Date;
  updateDate: Date;
  commonIdentifierCompany: string;
  taxpayerIdentification: string;
  professionalTax: string;
  objectives: Objective[];
}
