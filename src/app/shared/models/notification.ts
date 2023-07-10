import { ControlValidation } from "./control-validation";
import { NotificationState } from "./notification-state";
import { Owner } from "./owner";
import { Process } from "./process";

export class Notification{

  id: number;
  controlValidation: ControlValidation;
  notificationState :NotificationState;
  notificationType:Process;
  owner:Owner;
  dateNotification :Date= new Date()

}
