export class BusinessType {
  id!: number;
  code!: string;
  description!: string;
  creationDate!: Date;
  updateDate!: Date;
  prerequisiteTypes: PrerequisiteType[];
}
