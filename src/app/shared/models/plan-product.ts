import { Owner } from "./owner";
import { ControleTypeResponse } from "./controle-type-response";
import { Control } from "./control";
import { Process } from "./process";
import { FrequencyType } from "./frequency-type";
import { ControlPlan } from "./control-plan";
export class PlanProduct {

  id: number;
  code: string;
  description:string;
  controlPlans: ControlPlan[] = [];
  owner : Owner;

}
