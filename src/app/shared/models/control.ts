import { Owner } from "./owner";
import { ControleTypeResponse } from "./controle-type-response";
import { Process } from "./process";
import { ControlPlan } from "./control-plan";
import { FrequencyType } from "./frequency-type";
import { ControleType } from "./controle-type";

export class Control {

    id:number;
    controleType: ControleType;
    responseIntervale:String ;
   reponseValue: Boolean ;
 
   owner:Owner;
   controlPlan:ControlPlan ;
}
