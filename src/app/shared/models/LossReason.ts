import { LossReasonType } from "./LossReasonType";
import { User } from "./user";

export class LossReason {
  lossRId: number;
  lossRCode: string;
  lossRComment: string;
  lossRCreationDate: Date;
  lossRUpdateDate: Date;
  lossRUser: User;
  lossRLossReasonType: LossReasonType;
  // commercial: Commercial;
}
