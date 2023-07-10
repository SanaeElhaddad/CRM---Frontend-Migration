import { Owner } from "./owner";
import { ControleTypeResponse } from "./controle-type-response";
import { Control } from "./control";
import { Process } from "./process";
import { FrequencyType } from "./frequency-type";
export class ControlPlan {

  id: number;
  process : Process;
  frequencyType:FrequencyType ;
  frequencyValue:number ;
  controls: Control[] = [];
  owner : Owner;

}
