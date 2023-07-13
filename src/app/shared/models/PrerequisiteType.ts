import { BusinessType } from './BusinessType';

export class PrerequisiteType  {
  id!: number;
  code!: string;
  description!: string;
  creationDate!: Date;
  updateDate!: Date;
  type!: string;
  businessType!: BusinessType;
}
