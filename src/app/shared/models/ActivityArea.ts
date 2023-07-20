import { Account } from "./accounts";
import { User } from "./user";

export class ActivityArea {
  activityAreaId: number;
  activityAreaCode: string;
  activityAreaDescription: string;
  activityAreaCreationDate: Date;
  activityAreaUpdateDate: Date;
  activityAreaAccounts: Account[];
  //activityAreaCompanies: Company[];
  activityAreaUser: User;

  constructor() {
    this.activityAreaAccounts = [];
    //this.activityAreaCompanies = [];
  }
}

// You'll need to create TypeScript models for other referenced classes like Account, Company, User, etc.
// Assuming you have already defined those classes, you should include them in the TypeScript code as well.
