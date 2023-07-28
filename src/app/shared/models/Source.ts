import { User } from "./user";

export class Source {
  sourceId: number;
  sourceCode: string;
  sourceDescription: string;
  sourceCreationDate: Date;
  sourceUpdateDate: Date;
  sourceLedUser: User;
}
