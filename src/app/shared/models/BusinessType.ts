import {PrerequisiteType} from './PrerequisiteType';

export class BusinessType {
  id!: number;
  code!: string;
  description!: string;
  creationDate!: Date;
  updateDate!: Date;
  prerequisiteTypes: PrerequisiteType[];
}
